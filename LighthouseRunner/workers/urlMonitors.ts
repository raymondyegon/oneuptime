import UrlService from '../Utils/urlService';

import { fork } from 'child_process';
import moment from 'moment';

// This runs the lighthouse of URL Monitors

export default {
    ping: async (monitor: $TSFixMe) => {
        if (monitor && monitor.type) {
            if (monitor.data.url) {
                const now = new Date().getTime();
                const scanIntervalInDays = monitor.lighthouseScannedAt
                    ? moment(now).diff(
                          moment(monitor.lighthouseScannedAt),
                          'days'
                      )
                    : -1;
                if (
                    (monitor.lighthouseScanStatus &&
                        monitor.lighthouseScanStatus === 'scan') ||
                    (monitor.lighthouseScanStatus &&
                        monitor.lighthouseScanStatus === 'failed') ||
                    ((!monitor.lighthouseScannedAt || scanIntervalInDays > 0) &&
                        (!monitor.lighthouseScanStatus ||
                            monitor.lighthouseScanStatus !== 'scanning'))
                ) {
                    await UrlService.ping(monitor._id, {
                        monitor,
                        resp: { lighthouseScanStatus: 'scanning' },
                    });

                    const sites = monitor.siteUrls;

                    for (const url of sites) {
                        const resp = await lighthouseFetch(url);

                        await UrlService.ping(monitor._id, {
                            monitor,
                            resp,
                        });
                    }
                }
            }
        }
    },
};

const lighthouseFetch = (url: URL): void => {
    return new Promise((resolve, reject) => {
        const lighthouseWorker = fork('./utils/lighthouse');
        const timeoutHandler = setTimeout(async () => {
            await processLighthouseScan({
                data: { url },
                error: { message: 'TIMEOUT' },
            });
        }, 300000);

        lighthouseWorker.send(url);
        lighthouseWorker.on('message', async result => {
            await processLighthouseScan(result);
        });

        async function processLighthouseScan(result: $TSFixMe) {
            clearTimeout(timeoutHandler);
            lighthouseWorker.removeAllListeners();
            if (result.error) {
                reject({ lighthouseScanStatus: 'failed', ...result });
            } else {
                resolve({ lighthouseScanStatus: 'scanned', ...result });
            }
        }
    });
};
