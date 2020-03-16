import React, {useState} from "react";
import Artist from "./Artist";
import EventList from "./EventList";
import Event from "./Event";
// import debounce from "lodash.debounce";


const ArtistList = () => {
    const [search, setSearch] = useState(""); // initialise search field with empty string
    const [artists, setArtists] = useState([]); // initialise artists array with empty
    const [events, setEvents] = useState([]); // initialise events array with empty
    const [selectedArtist, setSelectedArtist] = useState(null); // initialise selectedArtist with null value

    const fetchArtists = (search) => {
        fetch("https://rest.bandsintown.com/artists/" + search + "/?app_id=1fe6b91037199181ed78c0a5ba6a810c").then(res => res.json())
            .then(data =>
                setArtists([data])
            )
    }
    const fetchEvents = (artist) => {
        fetch("https://rest.bandsintown.com/artists/" + artist.name + "/events/?app_id=1fe6b91037199181ed78c0a5ba6a810c").then(res => res.json())
            .then(data =>
                setEvents(data)
            )
    }
    // define event which will trigger when user inputs artist name in search field
    const handleChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value === "") {
            setArtists([]);
        } else {
            fetchArtists(e.target.value); // it will make API call to bandsintown and fetch matching artists
        }
    }

    const handleClick = (artist) => {
        setSelectedArtist(artist); // set the artist so that it can be re-useable
        fetchEvents(artist) // it will make API call to bandsintown and fetch events of selected artists
    }

    // define event for back to results link
    const handleBack = () => {
        setEvents([]);
        setSelectedArtist(null);
    }

    return (
        <>
            {/* Don't show search field if we're on event listing view */}
            {!selectedArtist &&
            <>
                <div className="search-bar">
                    <input className="form-control" value={search} onChange={(e) => handleChange(e)} type="text" name=""
                           placeholder="Search artist"/>
                    <span className="search-icon"/>
                </div>
                {/* Show text when artists array is not empty */}
                {artists.length > 0 && <p>{artists.length} Results found for {search}</p>}
                <div className="user-block">
                    {
                        /* Loop through artists and show them */
                        artists.map((artist) => (
                            <span onClick={() => handleClick(artist)}><Artist artist={artist}/></span>))
                    }
                </div>
            </> || <>
                <p className="back-to-results" onClick={handleBack}>Back to results</p>
                <div className="user-block">
                    <Artist artist={selectedArtist}/>
                </div>
                {/* Show text when events array is not empty */}
                {events.length > 0 && <p className="upcoming-events">{events.length} upcoming events</p>}
                <div className="event-details">
                    {
                        /* Loop through events and show them */
                        events.map((event) => (<Event event={event}/>))
                    }
                </div>
            </>
            }
        </>
    );
}

export default ArtistList;