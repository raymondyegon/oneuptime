var CB = require('cloudboost');

CB.CloudApp.init('hcaarmonukbk', 'cc7427bc-ca50-450e-a8a4-d2fc42155847');

module.exports = {
    sendIncidentCreated: async (incident) => {
        try {
            var project = await ProjectService.findOneBy({ _id: incident.projectId });
            var projectId = project ? project.parentProjectId ? project.parentProjectId._id : project._id : incident.projectId;

            CB.CloudNotification.publish(`incidentCreated-${projectId}`, incident);
        } catch (error) {
            ErrorService.log('realTimeService.sendIncidentCreated', error);
            throw error;
        }
    },

    sendMonitorCreated: async (monitor) => {
        try {
            var project = await ProjectService.findOneBy({ _id: monitor.projectId });
            var projectId = project ? project.parentProjectId ? project.parentProjectId._id : project._id : monitor.projectId;

            CB.CloudNotification.publish(`createMonitor-${projectId}`, monitor);
        } catch (error) {
            ErrorService.log('realTimeService.sendMonitorCreated', error);
            throw error;
        }
    },

    sendMonitorDelete: async (monitor) => {
        try {
            var project = await ProjectService.findOneBy({ _id: monitor.projectId });
            var projectId = project ? project.parentProjectId ? project.parentProjectId._id : project._id : monitor.projectId;

            CB.CloudNotification.publish(`deleteMonitor-${projectId}`, monitor);
        } catch (error) {
            ErrorService.log('realTimeService.sendMonitorDelete', error);
            throw error;
        }
    },

    incidentResolved: async (incident) => {
        try {
            var project = await ProjectService.findOneBy({ _id: incident.projectId });
            var projectId = project ? project.parentProjectId ? project.parentProjectId._id : project._id : incident.projectId;

            CB.CloudNotification.publish(`incidentResolved-${projectId}`, incident);
        } catch (error) {
            ErrorService.log('realTimeService.incidentResolved', error);
            throw error;
        }
    },

    incidentAcknowledged: async (incident) => {
        try {
            var project = await ProjectService.findOneBy({ _id: incident.projectId });
            var projectId = project ? project.parentProjectId ? project.parentProjectId._id : project._id : incident.projectId;

            CB.CloudNotification.publish(`incidentAcknowledged-${projectId}`, incident);
        } catch (error) {
            ErrorService.log('realTimeService.incidentAcknowledged', error);
            throw error;
        }
    },

    monitorEdit: async (monitor) => {
        try {
            var project = await ProjectService.findOneBy({ _id: monitor.projectId });
            var projectId = project ? project.parentProjectId ? project.parentProjectId._id : project._id : monitor.projectId;

            CB.CloudNotification.publish(`updateMonitor-${projectId}`, monitor);
        } catch (error) {
            ErrorService.log('realTimeService.monitorEdit', error);
            throw error;
        }
    },

    updateResponseTime: async (data, projectId) => {
        try {
            var project = await ProjectService.findOneBy({ _id: projectId });

            projectId = project ? project.parentProjectId ? project.parentProjectId._id : project._id : projectId;
            CB.CloudNotification.publish(`updateResponseTime-${projectId}`, data);
        } catch (error) {
            ErrorService.log('realTimeService.updateResponseTime', error);
            throw error;
        }
    },

    updateMonitorLog: async (data, monitorId, projectId) => {
        try {
            var project = await ProjectService.findOneBy({ _id: projectId });
            var parentProjectId = project ? project.parentProjectId ? project.parentProjectId._id : project._id : projectId;

            CB.CloudNotification.publish(`updateMonitorLog-${parentProjectId}`, { projectId, monitorId, data });
        } catch (error) {
            ErrorService.log('realTimeService.updateMonitorLog', error);
            throw error;
        }
    },

    updateProbe: async (data, monitorId) => {
        try {
            var monitor = await MonitorService.findOneBy({ _id: monitorId });
            var project = await ProjectService.findOneBy({ _id: monitor.projectId });
            var projectId = project ? project.parentProjectId ? project.parentProjectId._id : project._id : projectId;

            CB.CloudNotification.publish(`updateProbe-${projectId}`, data);
        } catch (error) {
            ErrorService.log('realTimeService.updateProbe', error);
            throw error;
        }
    },

    sendNotification: async (data) => {
        try {
            var project = await ProjectService.findOneBy({ _id: data.projectId });
            var projectId = project ? project.parentProjectId ? project.parentProjectId._id : project._id : data.projectId;

            CB.CloudNotification.publish(`NewNotification-${projectId}`, data);
        } catch (error) {
            ErrorService.log('realTimeService.sendNotification', error);
            throw error;
        }
    },

    updateTeamMemberRole: async (projectId, data) => {
        try {
            var project = await ProjectService.findOneBy({ _id: projectId });

            projectId = project ? project.parentProjectId ? project.parentProjectId._id : project._id : projectId;
            CB.CloudNotification.publish(`TeamMemberRoleUpdate-${projectId}`, data);
        } catch (error) {
            ErrorService.log('realTimeService.updateTeamMemberRole', error);
            throw error;
        }
    },

    createTeamMember: async (projectId, data) => {
        try {
            var project = await ProjectService.findOneBy({ _id: projectId });

            projectId = project ? project.parentProjectId ? project.parentProjectId._id : project._id : projectId;
            CB.CloudNotification.publish(`TeamMemberCreate-${projectId}`, data);
        } catch (error) {
            ErrorService.log('realTimeService.createTeamMember', error);
            throw error;
        }
    },

    deleteTeamMember: async (projectId, data) => {
        try {
            var project = await ProjectService.findOneBy({ _id: projectId });

            projectId = project ? project.parentProjectId ? project.parentProjectId._id : project._id : projectId;
            CB.CloudNotification.publish(`TeamMemberDelete-${projectId}`, data);
        } catch (error) {
            ErrorService.log('realTimeService.deleteTeamMember', error);
            throw error;
        }
    },
};

var ErrorService = require('./errorService');
var ProjectService = require('./projectService');
var MonitorService = require('./monitorService');
