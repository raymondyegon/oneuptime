import React, {
    Fragment,
    FunctionComponent,
    ReactElement,
    useEffect,
    useState,
} from 'react';
import PageComponentProps from '../PageComponentProps';
import ModelTable from 'CommonUI/src/Components/ModelTable/ModelTable';
import FieldType from 'CommonUI/src/Components/Types/FieldType';
import FormFieldSchemaType from 'CommonUI/src/Components/Forms/Types/FormFieldSchemaType';
import IconProp from 'Common/Types/Icon/IconProp';
import Domain from 'Model/Models/Domain';
import { ButtonStyleType } from 'CommonUI/src/Components/Button/Button';
import { ErrorFunction, VoidFunction } from 'Common/Types/FunctionTypes';
import ModelAPI from 'CommonUI/src/Utils/ModelAPI/ModelAPI';
import ObjectID from 'Common/Types/ObjectID';
import ConfirmModal from 'CommonUI/src/Components/Modal/ConfirmModal';
import DashboardNavigation from '../../Utils/Navigation';
import Navigation from 'CommonUI/src/Utils/Navigation';
import API from 'CommonUI/src/Utils/API/API';

const Domains: FunctionComponent<PageComponentProps> = (
    _props: PageComponentProps
): ReactElement => {
    const [showVerificationModal, setShowVerificationModal] =
        useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [currentVerificationDomain, setCurrentVerificationDomain] =
        useState<Domain | null>(null);
    const [refreshToggle, setRefreshToggle] = useState<boolean>(false);
    const [isVerificationLoading, setIsVerificationLoading] =
        useState<boolean>(false);

    useEffect(() => {
        setError('');
    }, [showVerificationModal]);

    return (
        <Fragment>
            <ModelTable<Domain>
                modelType={Domain}
                showViewIdButton={true}
                name="Settings > Domain"
                query={{
                    projectId: DashboardNavigation.getProjectId()?.toString(),
                }}
                id="domains-table"
                isDeleteable={true}
                isEditable={false}
                isCreateable={true}
                cardProps={{
                    title: 'Domains',
                    description:
                        'Please list the domains you own here. This will help you to connect them to Status Page.',
                }}
                refreshToggle={refreshToggle}
                noItemsMessage={'No domains found.'}
                viewPageRoute={Navigation.getCurrentRoute()}
                actionButtons={[
                    {
                        title: 'Verify Domain',
                        buttonStyleType: ButtonStyleType.SUCCESS_OUTLINE,
                        icon: IconProp.Check,
                        isVisible: (item: Domain): boolean => {
                            if (item['isVerified']) {
                                return false;
                            }

                            return true;
                        },
                        onClick: async (
                            item: Domain,
                            onCompleteAction: VoidFunction,
                            onError: ErrorFunction
                        ) => {
                            try {
                                setCurrentVerificationDomain(item);
                                setShowVerificationModal(true);

                                onCompleteAction();
                            } catch (err) {
                                onCompleteAction();
                                onError(err as Error);
                            }
                        },
                    },
                ]}
                formFields={[
                    {
                        field: {
                            domain: true,
                        },
                        title: 'Domain',
                        fieldType: FormFieldSchemaType.Domain,
                        required: true,
                        placeholder: 'acme-inc.com',
                        validation: {
                            minLength: 2,
                        },
                    },
                ]}
                selectMoreFields={{
                    domainVerificationText: true,
                }}
                showRefreshButton={true}
                filters={[
                    {
                        field: {
                            domain: true,
                        },
                        type: FieldType.Text,
                        title: 'Domain',
                    },
                    {
                        field: {
                            isVerified: true,
                        },
                        title: 'Verified',
                        type: FieldType.Boolean,
                    },
                ]}
                columns={[
                    {
                        field: {
                            domain: true,
                        },
                        title: 'Domain',
                        type: FieldType.Text,
                    },
                    {
                        field: {
                            isVerified: true,
                        },
                        title: 'Verified',
                        type: FieldType.Boolean,
                    },
                ]}
            />
            {showVerificationModal && currentVerificationDomain ? (
                <ConfirmModal
                    title={`Verify ${currentVerificationDomain['domain']}`}
                    error={error}
                    description={
                        <div>
                            <span>
                                Please add TXT record to your domain. Details of
                                the TXT records are:
                            </span>
                            <br />
                            <br />
                            <span>
                                <b>Record Type: </b> TXT
                            </span>
                            <br />
                            <span>
                                <b>Name: </b> @ or{' '}
                                {currentVerificationDomain[
                                    'domain'
                                ]?.toString()}
                            </span>
                            <br />
                            <span>
                                <b>Content: </b>
                                {(currentVerificationDomain[
                                    'domainVerificationText'
                                ] as string) || ''}
                            </span>
                            <br />
                            <br />
                            <span>
                                Please note: Some domain changes might take 72
                                hours to propagate.
                            </span>
                        </div>
                    }
                    submitButtonText={'Verify Domain'}
                    onClose={() => {
                        setShowVerificationModal(false);
                        setError('');
                    }}
                    isLoading={isVerificationLoading}
                    onSubmit={async () => {
                        try {
                            setIsVerificationLoading(true);
                            setError('');
                            // verify domain.
                            await ModelAPI.updateById({
                                modelType: Domain,
                                id: new ObjectID(
                                    currentVerificationDomain['_id']
                                        ? currentVerificationDomain[
                                              '_id'
                                          ].toString()
                                        : ''
                                ),
                                data: {
                                    isVerified: true,
                                },
                            });
                            setIsVerificationLoading(false);
                            setShowVerificationModal(false);
                            setRefreshToggle(!refreshToggle);
                        } catch (err) {
                            setError(API.getFriendlyMessage(err));
                            setIsVerificationLoading(false);
                        }
                    }}
                />
            ) : (
                <></>
            )}
        </Fragment>
    );
};

export default Domains;
