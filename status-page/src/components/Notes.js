import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ShouldRender from './ShouldRender';
import { capitalize } from '../config';

class Notes extends Component {
    handleIncidentStatus = (incident, timelines) => {
        let incidentTimeline = null,
            timelineStatus = null;
        timelines.map(timeline => {
            if (String(incident._id) === String(timeline.incidentId)) {
                incidentTimeline = timeline;
            }
            return timeline;
        });

        if (incidentTimeline) {
            if (
                !incidentTimeline.incident_state &&
                incidentTimeline.status !== 'resolved' &&
                incidentTimeline.status !== 'acknowledged'
            ) {
                timelineStatus = (
                    <span className="note_status">Identified</span>
                );
            }
            if (incidentTimeline.status === 'resolved') {
                timelineStatus = <span className="note_status">Resolved</span>;
            }
            if (incidentTimeline.status === 'acknowledged') {
                timelineStatus = (
                    <span className="note_status">Acknowledged</span>
                );
            }
            if (incidentTimeline.incident_state) {
                timelineStatus = (
                    <span className="note_status">
                        {capitalize(incidentTimeline.incident_state)}
                    </span>
                );
            }
        }

        return timelineStatus;
    };
    render() {
        const {
            statusPageId,
            uptimeColor,
            downtimeColor,
            degradedColor,
            incidentTimelines,
        } = this.props;

        return (
            <ShouldRender if={this.props.notes}>
                {this.props.notes.map((note, i) => {
                    if (!note) return <div>No note</div>;

                    return (
                        <li className="incidentlist feed-item clearfix" key={i}>
                            <div
                                className="incident-status-bubble"
                                style={{
                                    backgroundColor:
                                        note.incidentType === 'online'
                                            ? uptimeColor.backgroundColor
                                            : note.incidentType === 'offline'
                                            ? downtimeColor.backgroundColor
                                            : degradedColor.backgroundColor,
                                }}
                            ></div>
                            <div
                                className="message"
                                style={{
                                    width: '100%',
                                    marginLeft: 0,
                                    ...this.props.noteBackgroundColor,
                                }}
                            >
                                <div
                                    className="text"
                                    style={{
                                        paddingLeft: 0,
                                        paddingRight: 0,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        flexWrap: 'nowrap',
                                    }}
                                >
                                    <span
                                        style={{
                                            fontWeight: 'Bold',
                                            ...this.props.primaryTextColor,
                                            color: 'rgb(76, 76, 76)',
                                            marginLeft: 25,
                                        }}
                                    >
                                        {capitalize(note.title)}
                                    </span>
                                    <span
                                        style={{
                                            ...this.props.secondaryTextColor,
                                            color: 'rgba(0, 0, 0, 0.5)',
                                            display: 'block',
                                            textAlign: 'justify',
                                        }}
                                    >
                                        {note.description}.
                                    </span>
                                </div>
                            </div>
                            <div
                                className="ongoing__affectedmonitor"
                                style={
                                    note.description
                                        ? { marginTop: 10 }
                                        : { marginTop: 0 }
                                }
                            >
                                <span
                                    className="ongoing__affectedmonitor--title"
                                    style={{ color: 'rgb(76, 76, 76)' }}
                                >
                                    Resource Affected:
                                </span>{' '}
                                <span
                                    className="ongoing__affectedmonitor--content"
                                    style={{ color: 'rgba(0, 0, 0, 0.5)' }}
                                >
                                    {capitalize(note.monitorId.name)}
                                </span>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <span>
                                    <span
                                        className="time"
                                        style={{
                                            ...this.props.secondaryTextColor,
                                            marginLeft: 0,
                                            paddingBottom: 10,
                                            display: 'inline-block',
                                        }}
                                    >
                                        {moment(note.createdAt).format(
                                            'MMMM Do YYYY, h:mm a'
                                        )}
                                    </span>
                                    {this.handleIncidentStatus(
                                        note,
                                        incidentTimelines
                                    )}
                                    {note.resolved && (
                                        <span
                                            title="Resolved"
                                            className="resolved__incident"
                                        ></span>
                                    )}
                                </span>
                                <Link
                                    to={`/status-page/${statusPageId}/incident/${note._id}`}
                                    className="more-link"
                                >
                                    More
                                </Link>
                            </div>
                        </li>
                    );
                })}
            </ShouldRender>
        );
    }
}

Notes.displayName = 'Notes';

Notes.propTypes = {
    notes: PropTypes.array,
    secondaryTextColor: PropTypes.object,
    primaryTextColor: PropTypes.object,
    noteBackgroundColor: PropTypes.object,
    statusPageId: PropTypes.string,
    degradedColor: PropTypes.object,
    uptimeColor: PropTypes.object,
    downtimeColor: PropTypes.object,
    incidentTimelines: PropTypes.array,
};

export default Notes;
