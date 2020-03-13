import React, {useState} from "react";

const Event = ({ event }) => {
    return (
        <div className="card">
            <div className="card-title">Event Details</div>
            <div className="card-info">
                <div>
                    <span><strong> Country </strong></span>
                    <span>{event.venue.country}</span>
                </div>
                <div>
                    <span><strong>City </strong></span>
                    <span>{event.venue.city}</span>
                </div>
                <div>
                    <span><strong> Venue </strong></span>
                    <span>{event.venue.name}</span>
                </div>
                <div>
                    <span><strong> Date</strong></span>
                    <span>{event.datetime}</span>
                </div>
            </div>
        </div>
    );
}

export default Event;