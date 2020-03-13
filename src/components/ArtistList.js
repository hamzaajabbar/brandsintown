import React, {useState} from "react";
import Artist from "./Artist";
import EventList from "./EventList";
import Event from "./Event";
// import debounce from "lodash.debounce";


const ArtistList = () => {
    const [ search, setSearch ] = useState("");
    const [ artists, setArtists ] = useState([]);
    const [ events, setEvents ] = useState([]);
    const [ selectedArtist, setSelectedArtist ] = useState(null);

    const fetchArtists = (search) => {
        fetch("https://rest.bandsintown.com/artists/"+search+"/?app_id=1fe6b91037199181ed78c0a5ba6a810c").then(res => res.json())
            .then(data =>
                setArtists([data])
            )
    }
    const fetchEvents = (artist) => {
        fetch("https://rest.bandsintown.com/artists/"+artist.name+"/events/?app_id=1fe6b91037199181ed78c0a5ba6a810c").then(res => res.json())
            .then(data =>
                setEvents(data)
            )
    }
    const handleChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value === "") {
            setArtists([]);
        } else {
            fetchArtists(e.target.value);
        }
    }

    const handleClick = (artist) => {
        setSelectedArtist(artist);
        fetchEvents(artist)
    }


    const handleBack = () => {
        setEvents([]);
        setSelectedArtist(null);
    }

    return (
        <>
            {!selectedArtist &&
            <><div className="search-bar">
                <input className="form-control" value={search} onChange={(e) => handleChange(e)} type="text" name="" placeholder="Search artist"/>
                <span className="search-icon"/>
            </div>
            { artists.length > 0 && <p>{artists.length} Results found for {search}</p>}
            <div className="user-block">
                {
                    artists.map((artist) => (<span onClick={() => handleClick(artist)}><Artist artist={artist} /></span>))
                }
            </div>
            </> || <>
                <p className="back-to-results" onClick={handleBack}>Back to results</p>
                <div className="user-block">
                    <Artist artist={selectedArtist} />
                </div>
                { events.length > 0 && <p className="upcoming-events">{events.length} upcoming events</p>}
                <div className="event-details">
                    {
                        events.map((event) => (<Event event={event} />))
                    }
                </div>
                </>
            }
        </>
    );
}

export default ArtistList;