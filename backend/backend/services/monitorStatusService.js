module.exports = {

    create: async function (data) {
        try {
            const previousMonitorStatus = await this.findOneBy({ monitorId: data.monitorId, probeId: data.probeId });
            if (!previousMonitorStatus || (previousMonitorStatus && previousMonitorStatus.status !== data.status)) {
                // check if monitor has a previous status
                // check if previous status is different from the current status
                // if different, end the previous status and create a new monitor status
                if (previousMonitorStatus) {
                    await this.updateOneBy({
                        _id: previousMonitorStatus._id
                    }, {
                        endTime: Date.now()
                    });
                }

                const monitorStatus = new MonitorStatusModel();

                monitorStatus.monitorId = data.monitorId;
                monitorStatus.probeId = data.probeId || null;
                monitorStatus.manuallyCreated = data.manuallyCreated || false;
                monitorStatus.status = data.status;

                const savedMonitorStatus = await monitorStatus.save();

                await this.sendMonitorStatus(savedMonitorStatus);

                return savedMonitorStatus;
            }
        } catch (error) {
            ErrorService.log('MonitorStatusService.create', error);
            throw error;
        }
    },

    updateOneBy: async function (query, data) {
        try {
            if (!query) {
                query = {};
            }

            const updatedMonitorStatus = await MonitorStatusModel.findOneAndUpdate(query,
                { $set: data },
                {
                    new: true
                });

            return updatedMonitorStatus;
        } catch (error) {
            ErrorService.log('MonitorStatusService.updateOneBy', error);
            throw error;
        }
    },

    updateBy: async function (query, data) {
        try {
            if (!query) {
                query = {};
            }

            let updatedData = await MonitorStatusModel.updateMany(query, {
                $set: data
            });
            updatedData = await this.findBy(query);
            return updatedData;
        } catch (error) {
            ErrorService.log('MonitorStatusService.updateMany', error);
            throw error;
        }
    },

    findBy: async function (query, limit, skip) {
        try {
            if (!skip) skip = 0;

            if (!limit) limit = 0;

            if (typeof (skip) === 'string') {
                skip = parseInt(skip);
            }

            if (typeof (limit) === 'string') {
                limit = parseInt(limit);
            }

            if (!query) {
                query = {};
            }

            const monitorStatus = await MonitorStatusModel.find(query)
                .sort({ createdAt: -1 })
                .limit(limit)
                .skip(skip);
            return monitorStatus;
        }
        catch (error) {
            ErrorService.log('monitorStatusService.findBy', error);
            throw error;
        }
    },

    findOneBy: async function (query) {
        try {
            if (!query) {
                query = {};
            }
            const monitorStatus = await MonitorStatusModel.findOne(query, {}, {
                sort: { 'createdAt': -1 }
            })
                .lean();
            return monitorStatus;
        } catch (error) {
            ErrorService.log('MonitorStatusService.findOneBy', error);
            throw error;
        }
    },

    async sendMonitorStatus(data) {
        try {
            const monitor = await MonitorService.findOneBy({ _id: data.monitorId });
            if (monitor) {
                await RealTimeService.updateMonitorStatus(data, monitor.projectId._id);
            }
        } catch (error) {
            ErrorService.log('MonitorStatusService.sendMonitorStatus', error);
            throw error;
        }
    },
};

const MonitorStatusModel = require('../models/monitorStatus');
const MonitorService = require('../services/monitorService');
const RealTimeService = require('./realTimeService');
const ErrorService = require('../services/errorService');