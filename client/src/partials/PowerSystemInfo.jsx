import axios from "axios";
import { useEffect, useRef, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';

const PowerSystemInfo = ({ id, worldPowerSystem, setWorldPowerSystem }) => {

    const [rankInfoDisplay, setRankInfoDisplay] = useState(Array(worldPowerSystem.powerSystemRankings.length).fill(false));
    const [rankEditDiscriptionDisplay, setRankEditDiscriptionDisplay] = useState(Array(worldPowerSystem.powerSystemRankings.length).fill(false));
    const [addRankDisplay, setAddRankDisplay] = useState(false);
    const [editPowerSystemDetailsDisplayed, setEditPowerSystemDetailsDisplayed] = useState(false);

    const [powerSystemDetails, setPowerSystemDetails] = useState('');
    const [rankName, setRankName] = useState('');
    const [rankDescription, setRankDescription] = useState('');

    const [editRankDesciptionValues, setEditRankDescriptionValues] = useState([]);

    const capFirst = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const savePowerSystemDetails = async () => {
        const powerSystemData = { powerSystemDetails };
        const res = await axios.put(`/books/${id}/world-building/power-system/details`, powerSystemData);
        setWorldPowerSystem(res.data);
    };

    const saveRank = async () => {
        const newRank = { rankName, rankDescription }
        const res = await axios.put(`/books/${id}/world-building/power-system/rank`, newRank);
        setWorldPowerSystem(res.data);
    };

    const saveRankEdit = async (rankIndex) => {
        const editedRankDesctiption = { rankDescription: editRankDesciptionValues[rankIndex] };
        const res = await axios.put(`/books/${id}/world-building/power-system/rank/${rankIndex}`, editedRankDesctiption);
        setWorldPowerSystem(res.data);
    }

    const deleteRank = async (rankIndex) => {
        const res = await axios.delete(`/books/${id}/world-building/power-system/rank/${rankIndex}`);
        setWorldPowerSystem(res.data);
    }

    const powerRanks = () => {
        let divs = []
            for (let i = 0; i < worldPowerSystem.powerSystemRankings.length; i++) {
            divs.push (
                <div key={i} className={`flex-grow flex mb-8 flex-col relative text-background border-2 border-primary bg-primary justify-center rounded-2xl transition-all duration-200 ${rankInfoDisplay[i] ? '' : 'hover:text-primary hover:bg-background'}`}>
                    
                    <button
                        onClick={() => {
                    
                            setRankInfoDisplay(rankInfoDisplay.map((_, index) => {
                                if (index === i) {
                                    if (rankInfoDisplay[i] === true) {
                                        return !rankInfoDisplay[i];
                                } else {
                                    return true;
                                }
                            }
                        }));
                            
                    }} className="flex flex-col items-center">
                        <p className="p-6 text-2xl font-bold self-center">{worldPowerSystem.powerSystemRankings[i].rankName}</p>
                        {rankInfoDisplay[i] && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 -mt-6 mb-2 self-center">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                            </svg>
                        )}
                        {!rankInfoDisplay[i] && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 -mt-6 mb-2 self-center">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        )}

                    </button>

                    {rankInfoDisplay[i] && (
                        <>
                            <p className={`px-10 py-4 text-2xl w-full cursor-default text-left font-semibold whitespace-pre-line mb-4 ${rankEditDiscriptionDisplay[i] ? 'hidden' : 'block'}`}>{worldPowerSystem.powerSystemRankings[i].rankDescription}</p>
                            <div className={`w-3/5 bg-primary text-background self-center mt-6 mb-6 font-bold text-2xl rounded-full border-2 border-background cursor-pointer transition-all duration-200 text-center hover:text-primary py-1 hover:bg-background ${rankEditDiscriptionDisplay[i] ? 'hidden' : 'block'}`} onClick={(ev) => {
                                ev.stopPropagation();
                                setRankEditDiscriptionDisplay(rankEditDiscriptionDisplay.map((value, index) => index === i ? true : value));
                            }}>Edit</div>
                            <TextareaAutosize
                                className={`w-5/6 bg-primary resize-none overflow-hidden mt-6 rounded-2xl text-background text-xl font-semibold outline-none border-2 border-background self-center p-6 pb-10 ${rankEditDiscriptionDisplay[i] ? 'block' : 'hidden'}`}
                                value={editRankDesciptionValues[i]}
                                onClick={ev => ev.stopPropagation()}
                                onChange={ev => {
                                    let newValues = [...editRankDesciptionValues];
                                    newValues[i] = capFirst(ev.target.value);
                                    setEditRankDescriptionValues(newValues)
                                }}
                            />
                            <div className={`w-3/5 bg-primary text-background self-center text-center cursor-pointer mt-6 mb-6 font-bold text-2xl rounded-full border-2 border-background transition-all duration-200 hover:text-primary py-1 hover:bg-background ${rankEditDiscriptionDisplay[i] ? 'block' : 'hidden'}`} onClick={(ev) => {
                                saveRankEdit(i);
                                setRankEditDiscriptionDisplay(rankEditDiscriptionDisplay.map((value, index) => index === i ? false : value));
                                ev.stopPropagation()
                            }}>Save</div>
                        </>
                    )}
                    <div className="absolute top-3 cursor-pointer right-3 text-background bg-primary border-2 border-background p-1 rounded-full transition-all duration-200 hover:text-primary hover:bg-background hover:border-primary" onClick={(ev) => {
                        ev.stopPropagation();
                        deleteRank(i);
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </div>
                </div>
            );
        }
        return divs;
    };

    useEffect(() => {
        axios.get(`/books/${id}/world-building/power-system`)
            .then((res) => {
                setWorldPowerSystem(res.data)
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        setPowerSystemDetails(worldPowerSystem.powerSystemDetails);
    }, [worldPowerSystem]);


    useEffect(() => {
        if (worldPowerSystem.powerSystemRankings) {
            let descriptions = []
            for (let i = 0; i < worldPowerSystem.powerSystemRankings.length; i++) {
                descriptions.push(worldPowerSystem.powerSystemRankings[i].rankDescription);
            }
            setEditRankDescriptionValues(descriptions);
        }
        setRankEditDiscriptionDisplay(Array(worldPowerSystem.powerSystemRankings.length).fill(false));
        setRankInfoDisplay(Array(worldPowerSystem.powerSystemRankings.length).fill(false));
    }, [worldPowerSystem]);


    return (
        <div className="flex flex-col items-center pb-24 w-11/12">
            <div className="flex flex-col items-center w-3/5 border-2 border-primary px-6 py-10 rounded-3xl">
                <h2 className="text-primary text-5xl font-bold border-b-2 border-primary w-3/5 text-center pb-4">Power System</h2>
                
                <div className="border-2 border-primary rounded-2xl flex flex-col items-center w-5/6 mt-10 px-10">
                    <h2 className="text-primary text-3xl font-bold mb-4 mt-10 border-b-2 border-primary pb-4 w-full text-center">Power system details</h2>
                    <p className={`whitespace-pre-line text-primary w-5/6 bg-background font-semibold text-xl my-6 ${editPowerSystemDetailsDisplayed ? 'hidden' : 'block'}`}>{worldPowerSystem.powerSystemDetails}</p>
                    <button className={`w-3/5 bg-primary text-background self-center mb-10 font-bold text-2xl rounded-full border-2 border-primary transition-all duration-200 hover:text-primary py-1 hover:bg-background ${editPowerSystemDetailsDisplayed ? 'hidden' : 'block'}`} onClick={() => {
                        setEditPowerSystemDetailsDisplayed(true);
                    }}>Edit</button>
                    <TextareaAutosize
                        className={`w-5/6 bg-background resize-none overflow-hidden mt-6 rounded-2xl text-primary text-xl font-semibold outline-none border-2 border-primary p-6 pb-10 ${editPowerSystemDetailsDisplayed ? 'block' : 'hidden'}`}
                        placeholder="Power system details"
                        value={powerSystemDetails}
                        onChange={ev => {
                            setPowerSystemDetails(capFirst(ev.target.value));
                        }}
                    />
                    <button className={`w-3/5 bg-primary text-background self-center mt-6 mb-10 font-bold text-2xl rounded-full border-2 border-primary transition-all duration-200 hover:text-primary py-1 hover:bg-background ${editPowerSystemDetailsDisplayed ? 'block' : 'hidden'}`} onClick={() => {
                        savePowerSystemDetails();
                        setPowerSystemDetails('');
                        setEditPowerSystemDetailsDisplayed(false);
                    }}>Save</button>
                </div>

                <h3 className="text-primary text-3xl font-bold w-5/6 pb-4 border-b-2 border-primary text-center mt-10">Power system ranks</h3>
                <div className="w-full px-6 mt-10 flex flex-col gap-8">
                    {powerRanks()}
                </div>
                <div className={`w-5/6 mb-10 flex flex-col border-2 border-primary rounded-2xl p-8 ${addRankDisplay ? 'block' : 'hidden'}`}>
                    <input
                        type="text"
                        className="w-full border-2 border-primary outline-none text-primary text-2xl font-semibold px-8 py-4 bg-background rounded-2xl"
                        placeholder="Rank name"
                        value={rankName}
                        onChange={ev => setRankName(capFirst(ev.target.value))}
                    />
                    <TextareaAutosize
                        className="w-full border-2 border-primary outline-none overflow-hidden resize-none text-xl text-primary bg-background rounded-2xl mt-6 font-semibold px-8 py-4 min-h-24"
                        placeholder="Rank description"
                        value={rankDescription}
                        onChange={ev => setRankDescription(capFirst(ev.target.value))}
                    />
                    <button className="w-3/5 bg-primary text-background self-center mt-6 font-bold text-2xl rounded-full border-2 border-primary transition-all duration-200 hover:text-primary py-1 hover:bg-background" onClick={() => {
                        
                        saveRank();
                        setAddRankDisplay(false);
                        setRankDescription('');
                        setRankName('');

                    }}>Save</button>
                </div>
                <button className={`w-3/5 bg-primary text-background font-bold text-2xl rounded-full border-2 border-primary transition-all duration-200 hover:text-primary py-1 hover:bg-background ${addRankDisplay ? 'hidden' : 'block'}`} onClick={() => setAddRankDisplay(true)}>Add rank</button>
            </div>
        </div>
    );
}
 
export default PowerSystemInfo;