import React, {useState} from "react";

const Artist = ({ artist }) => {
    return (
        <div className="card">
            <div className="user-img">
                <img src={artist.thumb_url} alt="profile" />
            </div>
            <div className="user-info">
                <p>{artist.name}</p>
                <a href={artist.facebook_page_url}>{artist.facebook_page_url}</a>
            </div>
        </div>
    );
}

export default Artist;