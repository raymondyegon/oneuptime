import acme from 'acme-client';
import { LetsEncryptNotificationEmail } from '../../EnvironmentConfig';
import AcmeChallenge from 'Model/Models/AcmeChallenge';
import AcmeChallengeService from '../../Services/AcmeChallengeService';
import AcmeCertificate from 'Model/Models/AcmeCertificate';
import AcmeCertificateService from '../../Services/AcmeCertificateService';
import logger from '../Logger';
import OneUptimeDate from 'Common/Types/Date';
import LIMIT_MAX from 'Common/Types/Database/LimitMax';
import SortOrder from 'Common/Types/BaseDatabase/SortOrder';
import QueryHelper from '../../Types/Database/QueryHelper';
import BadDataException from 'Common/Types/Exception/BadDataException';
import { Challenge } from 'acme-client/types/rfc8555';

export default class GreenlockUtil {
    public static async renewAllCertsWhichAreExpiringSoon(data: {
        validateCname: (domain: string) => Promise<boolean>;
        notifyDomainRemoved: (domain: string) => Promise<void>;
    }): Promise<void> {
        logger.info('Renewing all certificates');

        // get all certificates which are expiring soon

        const certificates: AcmeCertificate[] =
            await AcmeCertificateService.findBy({
                query: {
                    expiresAt: QueryHelper.lessThanEqualTo(
                        OneUptimeDate.addRemoveDays(
                            OneUptimeDate.getCurrentDate(),
                            30
                        )
                    ),
                },
                limit: LIMIT_MAX,
                skip: 0,
                select: {
                    domain: true,
                },
                sort: {
                    expiresAt: SortOrder.Ascending,
                },
                props: {
                    isRoot: true,
                },
            });

        // order certificate for each domain

        for (const certificate of certificates) {
            if (!certificate.domain) {
                continue;
            }

            try {
                //validate cname
                const isValidCname: boolean = await data.validateCname(
                    certificate.domain
                );

                if (!isValidCname) {
                    await GreenlockUtil.orderCert({
                        domain: certificate.domain,
                        validateCname: data.validateCname,
                    });
                } else {
                    await GreenlockUtil.removeDomain(certificate.domain);
                    await data.notifyDomainRemoved(certificate.domain);
                }
            } catch (e) {
                logger.error(
                    `Error renewing certificate for domain: ${certificate.domain}`
                );
                logger.error(e);
            }
        }
    }

    public static async removeDomain(domain: string): Promise<void> {
        // remove certificate for this domain.
        await AcmeCertificateService.deleteBy({
            query: {
                domain: domain,
            },
            limit: 1,
            skip: 0,
            props: {
                isRoot: true,
            },
        });
    }

    public static async orderCert(data: {
        domain: string;
        validateCname: (domain: string) => Promise<boolean>;
    }): Promise<void> {
        let { domain } = data;

        domain = domain.trim().toLowerCase();

        //validate cname

        const isValidCname: boolean = await data.validateCname(domain);

        if (!isValidCname) {
            await GreenlockUtil.removeDomain(domain);
            logger.error(`Cname is not valid for domain: ${domain}`);
            throw new BadDataException(
                'Cname is not valid for domain ' + domain
            );
        }

        const client: acme.Client = new acme.Client({
            directoryUrl: acme.directory.letsencrypt.production,
            accountKey: await acme.crypto.createPrivateKey(),
        });

        const [certificateKey, certificateRequest] =
            await acme.crypto.createCsr({
                commonName: domain,
            });

        const certificate: string = await client.auto({
            csr: certificateRequest,
            email: LetsEncryptNotificationEmail.toString(),
            termsOfServiceAgreed: true,
            challengePriority: ['http-01'], // only http-01 challenge is supported by oneuptime
            challengeCreateFn: async (authz: acme.Authorization, challenge: Challenge , keyAuthorization: string) => {
                // Satisfy challenge here
                /* http-01 */
                if (challenge.type === 'http-01') {
                    const acmeChallenge = new AcmeChallenge();
                    acmeChallenge.challenge = keyAuthorization;
                    acmeChallenge.token = challenge.token;
                    acmeChallenge.domain = authz.identifier.value;

                    await AcmeChallengeService.create({
                        data: acmeChallenge,
                        props: {
                            isRoot: true,
                        },
                    });
                }
            },
            challengeRemoveFn: async (authz: acme.Authorization, challenge: Challenge) => {
                // Clean up challenge here

                if (challenge.type === 'http-01') {
                    await AcmeChallengeService.deleteBy({
                        query: {
                            domain: authz.identifier.value,
                        },
                        limit: 1,
                        skip: 0,
                        props: {
                            isRoot: true,
                        },
                    });
                }
            },
        });

        // get expires at date from certificate
        const cert: acme.CertificateInfo = await acme.forge.readCertificateInfo(certificate);
        const issuedAt: Date = cert.notBefore;
        const expiresAt: Date = cert.notAfter;

        // check if the certificate is already in the database.
        const existingCertificate: AcmeCertificate | null =
            await AcmeCertificateService.findOneBy({
                query: {
                    domain: domain,
                },
                select: {
                    _id: true,
                },
                props: {
                    isRoot: true,
                },
            });

        if (existingCertificate) {
            // update the certificate
            await AcmeCertificateService.updateBy({
                query: {
                    domain: domain,
                },
                limit: 1,
                skip: 0,
                data: {
                    certificate: certificate.toString(),
                    certificateKey: certificateKey.toString(),
                    issuedAt: issuedAt,
                    expiresAt: expiresAt,
                },
                props: {
                    isRoot: true,
                },
            });
        } else {
            // create the certificate
            const acmeCertificate: AcmeCertificate = new AcmeCertificate();

            acmeCertificate.domain = domain;
            acmeCertificate.certificate = certificate.toString();
            acmeCertificate.certificateKey = certificateKey.toString();
            acmeCertificate.issuedAt = issuedAt;
            acmeCertificate.expiresAt = expiresAt;

            await AcmeCertificateService.create({
                data: acmeCertificate,
                props: {
                    isRoot: true,
                },
            });
        }
    }
}
