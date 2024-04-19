import axios from "axios";
import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const TerritoriesInfo = ({ id, territories, setTerritories }) => {

    const newTerritoryDetailsRef = useRef();
    const newLocationDetailsRef = useRef();

    const isFirstRender = useRef(true);

    const [territoryDisplayStatus, setTerritoryDisplayStatus] = useState(Array(territories.length).fill(false));

    const [addLocationDisplayedStatus, setAddLocationDisplayedStatus] = useState(Array(territories.length).fill(false));

    const [newLocationDisplayed, setNewLocationDisplayed] = useState(false);
    
    const [editTerritoryInfoDisplay, setEditTerritoryInfoDisplay] = useState(Array(territories.length).fill(false));
    const [editLocationInfoDisplay, setEditLocationInfoDisplay] = useState(Array(territories.length).fill(false));

    const [territoryName, setTerritoryName] = useState('');
    const [territoryDetails, setTerritoryDetails] = useState('');
    const [placeName, setPlaceName] = useState('');
    const [placeDetails, setPlaceDetails] = useState('');

    const [newTerritoryDisplayed, setNewTerritoryDisplayed] = useState(false);

    const saveTerritory = async () => {
        const territoryData = {territoryName, territoryDetails};
        try {
            const res = await axios.put(`/books/${id}/world-building/territories`, territoryData);
            setTerritories(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const saveTerritoryEdit = async (territoryIndex) => {
        const territoryData = { territoryName, territoryDetails };
        try {
            const res = await axios.put(`/books/${id}/world-building/territories/edit/${territoryIndex}`, territoryData);
            setTerritories(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteTerritory = async (territoryIndex) => {
        try {
            const res = await axios.delete(`/books/${id}/world-building/territories/${territoryIndex}`);
            setTerritories(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const savePlaceToTerritory = async (territoryIndex) => {
        const placeData = { placeName, placeDetails };
        try {
            const res = await axios.put(`/books/${id}/world-building/territories/${territoryIndex}`, placeData);
            setTerritories(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const savePlaceEdit = async (territoryIndex, placeIndex, e) => {
        e.preventDefault();
        const placeData = { placeName, placeDetails };
        try {
            const res = await axios.put(`/books/${id}/world-building/territories/${territoryIndex}/places/${placeIndex}/edit`, placeData);
            setTerritories(res.data);
        } catch (err) {console.log(err)}
    }

    const deletePlaceInTerritory = async (territoryIndex, placeInTerritoryIndex) => {
        try {
            const res = await axios.delete(`/books/${id}/world-building/territories/${territoryIndex}/${placeInTerritoryIndex}`);
            setTerritories(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (isFirstRender) {
            setTerritoryDisplayStatus(Array(territories.length).fill(false))
            setAddLocationDisplayedStatus(Array(territories.length).fill(false));
            setEditTerritoryInfoDisplay(Array(territories.length).fill(false));
            setEditLocationInfoDisplay(Array(territories.length).fill(false));
        }
    }, [territories]);

    useEffect(() => {
        axios.get(`/books/${id}/world-building/territories`)
            .then((res) => {
                setTerritories(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <div className="flex flex-col items-center pb-24 w-11/12">
            <h1 className="text-5xl mb-10 text-primary font-bold border-b-2 border-primary pb-6 w-3/5 text-center">Territories</h1>


            <button className={`text-background bg-primary rounded-full border-2 border-primary w-3/5 text-2xl font-bold py-4 px-2 mb-10 transition-all duration-200 hover:text-primary hover:bg-background ${newTerritoryDisplayed ? 'hidden' : 'block'}`} onClick={(e) => {e.preventDefault(); setNewTerritoryDisplayed(true)}}>Create territory</button>

            {newTerritoryDisplayed && (
                <div className="w-3/5 border-2 border-primary rounded-2xl p-8 mb-10 flex flex-col items-center">
                    <h2 className="text-3xl text-primary font-bold border-b-2 border-primary pb-6 w-full text-center">New Territory</h2>
                    <input
                        type="text"
                        placeholder="New territory name"
                        className="w-full border-2 border-primary outline-none bg-background text-primary p-4 rounded-2xl mt-6 text-xl font-semibold"
                        value={territoryName}
                        onChange={ev => setTerritoryName(ev.target.value)}
                    />

                    <TextareaAutosize
                        ref={newTerritoryDetailsRef}
                        className="w-full border-2 border-primary outline-none bg-background text-primary font-semibold text-xl p-4 rounded-2xl mt-6 overflow-hidden"
                        placeholder="Territory details"
                        value={territoryDetails}
                        onChange={ev => setTerritoryDetails(ev.target.value)}
                    />
                    <button
                        className="text-background bg-primary border-2 border-primary rounded-full w-3/5 text-2xl font-bold py-2 px-4 mt-6 transition-all duration-200 hover:text-primary hover:bg-background"
                        onClick={(e) => {
                            e.preventDefault();
                            saveTerritory();
                            setNewTerritoryDisplayed(false);
                            setTerritoryName('');
                            setTerritoryDetails('');
                        }}
                    >
                        Save territory
                    </button>
                </div>
            )}

            {territories && territories.length > 0 && territories.map((territory, index) => (
                <div key={index} className="flex flex-col items-center relative w-3/5 border-2 border-primary px-6 py-10 rounded-3xl mb-10">
                    <h2 className={`text-primary text-3xl cursor-default font-bold border-b-2 border-primary w-3/4 text-center pb-4 ${editTerritoryInfoDisplay[index] ? 'hidden' : 'block'}`}>{territory.territoryName}</h2>
                    <input
                        type="text"
                        className={`text-primary text-3xl font-bold border-2 rounded-2xl border-primary w-3/4 text-center p-4 outline-none bg-background ${editTerritoryInfoDisplay[index] ? 'block' : 'hidden'}`}
                        placeholder="Territorry name"
                        value={territoryName}
                        onChange={ev => setTerritoryName(ev.target.value)}
                    />

                    <div className={`w-5/6 border-2 border-primary rounded-2xl mt-8 p-5 flex flex-col items-center ${territoryDisplayStatus[index] ? 'block' : 'hidden'}`}>
                        <h3 className={`text-primary text-2xl font-bold border-b-2 border-primary pb-4 w-full`}>Details:</h3>
                        <p className={`text-xl font-semibold text-primary p-6 w-11/12 ${editTerritoryInfoDisplay[index] ? 'hidden' : 'block'}`}>{territory.territoryDetails}</p>
                        <TextareaAutosize
                            className={`text-primary text-xl min-h-32 font-semibold border-2 rounded-2xl border-primary w-11/12 p-4 outline-none bg-background mt-6 ${editTerritoryInfoDisplay[index] ? 'block' : 'hidden'}`} placeholder="Territory details"
                            value={territoryDetails}
                            onChange={ev => setTerritoryDetails(ev.target.value)}
                        />
                        <button className={`bg-primary mt-6 w-1/2 text-background text-2xl p-1 font-bold rounded-full border-2 border-primary transition-all duration-200 hover:text-primary hover:bg-background ${editTerritoryInfoDisplay[index] ? 'hidden' : 'block'}`} onClick={(e) => {
                            e.preventDefault();
                            setEditTerritoryInfoDisplay(editTerritoryInfoDisplay.map((value, i) => i === index ? true : false));
                            setTerritoryName(territory.territoryName);
                            setTerritoryDetails(territory.territoryDetails);
                        }}>Edit territory info</button>
                        <button className={`bg-primary mt-6 w-1/2 text-background text-2xl p-1 font-bold rounded-full border-2 border-primary transition-all duration-200 hover:text-primary hover:bg-background ${editTerritoryInfoDisplay[index] ? 'block' : 'hidden'}`} onClick={(e) => {
                            e.preventDefault();
                            setEditTerritoryInfoDisplay(editTerritoryInfoDisplay.map((value, i) => i === index ? false : false));
                            saveTerritoryEdit(index);
                            setTerritoryName('');
                            setTerritoryDetails('');
                        }}>Save</button>
                    </div>

                    {territories[index].placesInTerritory && territories[index].placesInTerritory.length > 0 && (
                        <div className={`w-5/6 flex flex-col mb-2 border-2 border-primary rounded-2xl mt-8 p-5 ${territoryDisplayStatus[index] && !editTerritoryInfoDisplay[index] ? 'block' : 'hidden'}`}>
                            <h3 className={`text-primary text-2xl font-bold border-b-2 border-primary pb-4 w-full`}>Locations:</h3>
                            {territories[index].placesInTerritory && territories[index].placesInTerritory.map((place, placeIndex) => (
                                <div key={placeIndex} className="flex flex-col">
                                    <div className="w-4/5 self-center bg-primary relative text-background mt-6 rounded-3xl p-4 flex flex-col">
                                        <h4 className={`text-2xl text-center cursor-default font-bold border-b-2 border-background pb-4 w-full ${editLocationInfoDisplay[placeIndex] ? 'hidden' : 'block'}`}>{place.placeName}</h4>
                                        <input
                                            type="text"
                                            className={`text-2xl text-primary text-center bg-background rounded-2xl p-2 font-bold w-5/6 self-center ${editLocationInfoDisplay[placeIndex] ? 'block' : 'hidden'}`}
                                            placeholder="Location name"
                                            value={placeName}
                                            onChange={ev => setPlaceName(ev.target.value)}
                                        />
                                        <p className={`text-xl cursor-default font-semibold p-4 whitespace-pre-line ${editLocationInfoDisplay[placeIndex] ? 'hidden' : 'block'}`}>{place.placeDetails}</p>
                                        <TextareaAutosize
                                            className={`text-primary self-center text-xl min-h-32 font-semibold border-2 rounded-2xl border-primary w-11/12 p-4 outline-none bg-background mt-6 ${editLocationInfoDisplay[placeIndex] ? 'block' : 'hidden'}`}
                                            placeholder="Location details"
                                            value={placeDetails}
                                            onChange={ev => setPlaceDetails(ev.target.value)}
                                        />

                                        <button className={`bg-primary self-center mt-6 w-2/3 text-background text-2xl p-1 font-bold rounded-full border-2 border-background transition-all duration-200 hover:text-primary hover:bg-background ${editLocationInfoDisplay[placeIndex] ? 'hidden' : 'block'}`} onClick={(e) => {
                                            e.preventDefault();
                                            setEditLocationInfoDisplay(editLocationInfoDisplay.map((value, i) => i === placeIndex ? true : value));
                                            setPlaceName(place.placeName);
                                            setPlaceDetails(place.placeDetails);
                                        }}>Edit location info</button>
                                        <button className={`bg-primary self-center mt-6 w-1/2 text-background text-2xl p-1 font-bold rounded-full border-2 border-background transition-all duration-200 hover:text-primary hover:bg-background ${editLocationInfoDisplay[placeIndex] ? 'block' : 'hidden'}`} onClick={(e) => {
                                            setEditLocationInfoDisplay(editLocationInfoDisplay.map((value, i) => i === placeIndex ? false : value));
                                            savePlaceEdit(index, placeIndex, e);
                                            setPlaceName('');
                                            setPlaceDetails('');
                                        }}>Save</button>
                                        <button
                                            className="absolute top-3 right-3 bg-background border-2 border-background text-primary p-1 rounded-full transition-all duration-200 hover:bg-primary hover:text-background"
                                            onClick={(e) => {e.preventDefault(); deletePlaceInTerritory(index, placeIndex)}}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div> 
                            ))}
                        </div>
                    )}

                    {addLocationDisplayedStatus[index] && (
                        <div className={`w-5/6 border-2 border-primary p-4 mt-6 rounded-2xl ${territoryDisplayStatus[index] && !editTerritoryInfoDisplay[index] ? 'block' : 'hidden'}`}>
                            <h3 className="text-primary text-2xl font-bold mb-4 pl-2">New location:</h3>
                            <input
                                type="text"
                                placeholder="New location name"
                                className="w-full bg-background text-primary outline-none border-2 border-primary p-4 rounded-2xl text-xl font-semibold"
                                value={placeName}
                                onChange={ev => setPlaceName(ev.target.value)}
                            />
                            <TextareaAutosize
                                ref={newLocationDetailsRef}
                                placeholder="Location details"
                                className="bg-background p-4 rounded-2xl outline-none overflow-hidden text-xl font-semibold text-primary border-2 border-primary w-full mt-6"
                                value={placeDetails}
                                onChange={ev => setPlaceDetails(ev.target.value)}
                            />
                            <button className="text-background bg-primary border-2 border-primary transition-all duration-200 hover:text-primary hover:bg-background rounded-3xl font-bold flex flex-col items-center text-xl mt-2 w-full py-2" onClick={(e) => {
                                e.preventDefault();
                                savePlaceToTerritory(index);
                                setAddLocationDisplayedStatus(addLocationDisplayedStatus.map((value, i) => i === index ? false: value));
                                setNewLocationDisplayed(false);
                                setPlaceName('');
                                setPlaceDetails('');
                            }}>Save location</button>

                        </div>
                    )}
                    
                    {!addLocationDisplayedStatus[index] && (
                        <>
                            <button className={`text-background bg-primary border-2 border-primary transition-all duration-200 hover:text-primary hover:bg-background rounded-full font-bold flex flex-col items-center text-xl mt-10 w-1/3 py-3 ${territoryDisplayStatus[index] && !editTerritoryInfoDisplay[index] ? 'block' : 'hidden'}`} onClick={(e) => {
                                e.preventDefault();
                                setAddLocationDisplayedStatus(addLocationDisplayedStatus.map((_, i) => i === index ? true : false));
                                setNewLocationDisplayed(true);
                                }}>Add location</button>
                        </>
                    )}

                    <button className="text-background bg-primary border-2 border-primary transition-all duration-200 hover:text-primary hover:bg-background rounded-full font-bold flex flex-col items-center text-lg mt-10 w-4/5" onClick={(e) => {
                        e.preventDefault();
                        setTerritoryDisplayStatus(territoryDisplayStatus.map((value, i) => i === index ? !value : false));
                    }}>
                        {territoryDisplayStatus[index] ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                </svg>
                                Less info
                            </>
                        ) : (
                            <>
                                More info
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </>
                        )}
                        
                    </button>
                    <button
                        className="absolute bg-primary text-background p-2 rounded-full border-2 border-primary top-3 right-3 transition-all duration-200 hover:bg-background hover:text-primary"
                        onClick={() => deleteTerritory(index)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
            ))}
        </div>
    );
}
 
export default TerritoriesInfo;