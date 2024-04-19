import axios from "axios";
import { useEffect, useRef, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';

const RacesInfo = ({ id, races, setRaces }) => {

    const [raceDisplayed, setRaceDisplayed] = useState(Array(races.length).fill(false));
    const [raceEditDisplayed, setRaceEditDisplayed] = useState(Array(races.length).fill(false));
    
    const [newRaceDisplayed, setnewRaceDisplayed] = useState(false);

    const [raceName, setRaceName] = useState('');
    const [raceDetails, setRaceDetails] = useState('');
    
    const [editingRaceDetails, setEditingRaceDetails] = useState('');


    const saveRace = async (raceData) => {
        try {
            const res = await axios.put(`/books/${id}/world-building/race`, raceData);
            setRaces(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteRace = async (raceIndex) => {
        try {
            const res = await axios.delete(`/books/${id}/world-building/race/${raceIndex}`);
            setRaces(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const saveEditedRaceDetails = async (raceIndex, newDetails) => {
        const objectDetails = { newDetails }
        try {
            const res = await axios.put(`/books/${id}/world-building/${raceIndex}`, objectDetails);
            setRaces(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const capFirst = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        axios.get(`/books/${id}/world-building/races`)
            .then((res) => {
                setRaces(res.data);

            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        setRaceDisplayed(Array(races.length).fill(false));
        setRaceEditDisplayed(Array(races.length).fill(false));
    }, [races]);

    return (
        <div className="flex flex-col items-center pb-24 w-11/12">
            <div className="flex flex-col items-center w-3/5 border-2 border-primary px-6 py-10 rounded-3xl">
                <h1 className="text-primary text-5xl font-bold border-b-2 border-primary w-3/5 text-center pb-4">Races</h1>
                <button className={`w-3/4 mt-10 bg-primary text-background py-1 text-2xl rounded-full border-2 border-primary font-bold transition-all duration-200 hover:text-primary hover:bg-background ${newRaceDisplayed ? 'hidden' : 'block'}`} onClick={() => {
                    setnewRaceDisplayed(true);
                }}>Add race</button>
                <div className={`w-5/6 mt-10 border-2 border-primary p-6 rounded-2xl flex flex-col items-center ${newRaceDisplayed ? 'block' : 'hidden'}`}>
                    <h2 className="text-primary text-2xl font-bold text-center w-full mb-6">New race</h2>
                    <input
                        type="text"
                        className="bg-background outline-none border-2 border-primary rounded-2xl text-2xl font-semibold text-primary w-full p-4 h-auto"
                        placeholder="Name of race"
                        value={raceName}
                        onChange={ev => setRaceName(capFirst(ev.target.value))}
                    />

                    <TextareaAutosize
                        className="bg-background outline-none border-2 border-primary rounded-2xl text-xl font-semibold text-primary py-4 px-6 mt-6 w-full resize-none overflow-hidden"
                        placeholder="Race details"
                        value={raceDetails}
                        onChange={ev => setRaceDetails(capFirst(ev.target.value))}
                    />

                    <button className="w-3/4 bg-primary text-background py-1 text-2xl rounded-full mt-10 border-2 border-primary font-bold transition-all duration-200 hover:text-primary hover:bg-background"
                        onClick={() => {
                            const raceData = { raceName, raceDetails };
                            saveRace(raceData);
                            setRaceName('');
                            setRaceDetails('');
                            setnewRaceDisplayed(false);
                        }}
                    >Save race</button>
                </div>
                <div className="w-5/6 mt-10">
                    {races && races.map((race, index) => (
                        <div key={index} className="flex relative flex-col p-6 items-center w-full border-2 border-primary mb-10 rounded-2xl">
                            <h2 className="text-primary text-3xl font-bold text-center border-b-2 pb-2 border-primary w-full">{race.raceName}</h2>
                            <p className={`text-primary p-6 w-full font-semibold text-xl whitespace-pre-line ${raceEditDisplayed[index] ? 'hidden' : 'block'} ${raceDisplayed[index] ? 'block' : 'hidden'}`}>{race.raceDetails}</p>
                            <TextareaAutosize
                                className={`bg-background outline-none border-2 border-primary rounded-2xl text-xl font-semibold text-primary py-4 px-6 mt-6 w-full resize-none overflow-hidden ${raceEditDisplayed[index] ? 'block' : 'hidden'}`}
                                placeholder="New race details"
                                value={editingRaceDetails}
                                onChange={ev => {
                                    setEditingRaceDetails(capFirst(ev.target.value))
                                }}
                            />
                            <button
                                className={`w-1/3 bg-primary text-background py-1 text-xl rounded-full mb-6 border-2 border-primary font-bold transition-all duration-200 hover:text-primary mt-5 hover:bg-background ${raceEditDisplayed[index] ? 'block' : 'hidden'} ${raceDisplayed[index] ? 'block' : 'hidden'}`}
                                onClick={() => {
                                    saveEditedRaceDetails(index, editingRaceDetails);
                                    setEditingRaceDetails('');
                                    setRaceEditDisplayed(raceEditDisplayed.map((value, i) => i === index ? false : value ));
                                }}>
                                Save
                            </button>
                            <button
                                className={`w-1/3 bg-primary text-background py-1 text-xl rounded-full mb-6 border-2 border-primary font-bold transition-all duration-200 hover:text-primary hover:bg-background ${raceEditDisplayed[index] ? 'hidden' : 'block'} ${raceDisplayed[index] ? 'block' : 'hidden'}`}
                                onClick={() => {
                                    setRaceEditDisplayed(raceEditDisplayed.map((_, i) => i === index ? true : false ));
                                    setEditingRaceDetails(race.raceDetails);
                                }}>
                                Edit
                            </button>

                            <button
                                className={`w-3/4 bg-primary text-background py-1 text-2xl rounded-full mt-6 border-2 border-primary font-bold transition-all duration-200 hover:text-primary hover:bg-background ${raceDisplayed[index] ? 'block' : 'hidden'}`}
                                onClick={() => {
                                    setRaceDisplayed(raceDisplayed.map((value, i) => i === index ? false : value));
                                }}>
                                <p className="w-full flex justify-center -mb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                    </svg>
                                </p>
                                Hide info
                            </button>
                            
                            <button
                                className={`w-3/4 bg-primary text-background py-1 text-2xl rounded-full mt-6 border-2 border-primary font-bold transition-all duration-200 hover:text-primary hover:bg-background ${raceDisplayed[index] ? 'hidden' : 'block'}`}
                                onClick={() => {
                                    setRaceDisplayed(raceDisplayed.map((_, i) => i === index ? true : false));
                                }}
                            >
                                Show info
                                <p className="w-full flex justify-center -mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </p>
                            </button>
                            <button className="absolute top-3 right-3 bg-primary border-2 border-primary text-background p-1 rounded-full transition-all duration-200 hover:text-primary hover:bg-background" onClick={() => {
                                deleteRace(index);
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default RacesInfo;