import axios from "axios";
import { useEffect, useRef, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';

const WorldInfo = ({
    id, worldInfo, setWorldInfo, worldHistoryDetails, setWorldHistoryDetails, worldGeographyDetails, setWorldGeographyDetails, worldTechnologyDetails, setWorldTechnologyDetails, worldEconomyDetails, setWorldEconomyDetails
}) => {

    const [worldHistoryDisplayed, setWorldHistoryDisplayed] = useState(false);
    const [worldHistoryEditDisplayed, setWorldHistoryEditDisplayed] = useState(false);

    const [worldGeographyDisplayed, setWorldGeographyDisplayed] = useState(false);
    const [worldGeographyEditDisplayed, setWorldGeographyEditDisplayed] = useState(false);


    const [worldTechDisplayed, setWorldTechDisplayed] = useState(false);
    const [worldTechEditDisplayed, setWorldTechEditDisplayed] = useState(false);

    const [worldEconDisplayed, setWorldEconDisplayed] = useState(false);
    const [worldEconEditDisplayed, setWorldEconEditDisplayed] = useState(false);

    const saveWorldInfo = async () => {
        const worldInfo = {
            worldHistoryDetails, worldGeographyDetails, worldTechnologyDetails, worldEconomyDetails
        }
        try {
            const res = await axios.put(`/books/${id}/world-building/info`, worldInfo);
            setWorldInfo(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (Object.keys(worldInfo).length === 0) {
            axios.get(`/books/${id}/world-building/info`)
                .then((res) => {
                    setWorldInfo(res.data);
                })
                .catch(err => console.log(err));
        }
    }, [worldInfo]);

    useEffect(() => {
        setWorldHistoryDetails(worldInfo.worldHistoryDetails);
        setWorldGeographyDetails(worldInfo.worldGeographyDetails);
        setWorldTechnologyDetails(worldInfo.worldTechnologyDetails);
        setWorldEconomyDetails(worldInfo.worldEconomyDetails);
    }, [worldInfo]);


    return (
        <div className="flex flex-col items-center pb-24 w-7/12 py-10 border-2 border-primary rounded-3xl">
            <h1 className="text-primary text-5xl mb-10 font-bold w-full text-center">World Info</h1>
            <div className="flex flex-col items-center w-4/5 border-2 border-primary px-6 py-10 rounded-3xl">
                <h2 className="text-primary text-3xl font-bold border-b-2 border-primary w-3/5 text-center pb-4">World History</h2>
                {!worldHistoryEditDisplayed && worldHistoryDisplayed && (
                    <>
                        <p className="text-xl text-primary font-semibold p-10 whitespace-pre-line">{worldHistoryDetails}</p>
                        <button className="text-2xl text-background font-bold bg-primary px-4 py-2 rounded-full w-1/3" onClick={() => {setWorldHistoryEditDisplayed(true)}}>
                            Edit
                        </button>
                    </>
                )}
                <div className={`flex flex-col w-5/6 items-center ${worldHistoryEditDisplayed ? 'block' : 'hidden'}`}>
                    
                    <TextareaAutosize className={`text-xl font-semibold text-primary px-6 py-6 w-full bg-background resize-none outline-none border-2 border-primary rounded-2xl mt-8 overflow-hidden`}
                        value={worldHistoryDetails}
                        onChange={ev => setWorldHistoryDetails(ev.target.value)}
                    />

                    <button className="text-2xl text-background font-bold bg-primary px-4 py-2 rounded-full w-1/3 mt-6" onClick={() => {worldHistoryDetails === '' ? '' : setWorldHistoryEditDisplayed(false)}}>
                        Save
                    </button>
                </div>
                {worldHistoryDetails !== '' && (
                    <>
                        <button className={`text-background bg-primary rounded-full border-2 border-primary transition-all duration-200 hover:text-primary hover:bg-background font-bold flex flex-col items-center text-lg mt-10 w-4/5 ${worldHistoryEditDisplayed ? 'hidden' : 'block'}`} onClick={() => {
                        worldHistoryDisplayed ? setWorldHistoryDisplayed(false) : setWorldHistoryDisplayed(true);
                        }}>
                        {worldHistoryDisplayed ? (
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
                    </>
                )}
            </div>

            <div className="flex flex-col mt-12 items-center w-4/5 border-2 border-primary px-6 py-10 rounded-3xl">
                <h2 className="text-primary text-3xl font-bold border-b-2 border-primary w-3/5 text-center pb-4">World Geography</h2>
                {!worldGeographyEditDisplayed && worldGeographyDisplayed && (
                    <>
                        <p className="text-xl text-primary font-semibold p-10">{worldGeographyDetails}</p>
                        <button className="text-2xl text-background font-bold bg-primary px-4 py-2 rounded-full w-1/3" onClick={() => {setWorldGeographyEditDisplayed(true)}}>
                            Edit
                        </button>
                    </>
                )}
                <div className={`flex flex-col w-5/6 items-center ${worldGeographyEditDisplayed ? 'block' : 'hidden'}`}>
                    <TextareaAutosize className={`text-xl font-semibold text-primary p-6 w-full bg-background resize-none outline-none border-2 border-primary rounded-2xl mt-8 overflow-hidden`}
                        value={worldGeographyDetails}
                        onChange={ev => setWorldGeographyDetails(ev.target.value)}
                    />
                    <button className="text-2xl text-background font-bold bg-primary px-4 py-2 rounded-full w-1/3 mt-6" onClick={() => {setWorldGeographyEditDisplayed(false)}}>
                        Save
                    </button>
                </div>
                {worldGeographyDetails !== '' && (
                    <>
                        <button className={`text-background bg-primary border-2 border-primary transition-all duration-200 hover:text-primary hover:bg-background rounded-full font-bold flex flex-col items-center text-lg mt-10 w-4/5 ${worldGeographyEditDisplayed ? 'hidden' : 'block'}`} onClick={() => {
                            worldGeographyDisplayed ? setWorldGeographyDisplayed(false) : setWorldGeographyDisplayed(true);
                        }}>
                        {worldGeographyDisplayed ? (
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
                    </>
                )}
            </div>

            <div className="flex flex-col mt-12 items-center w-4/5 border-2 border-primary px-6 py-10 rounded-3xl">
                <h2 className="text-primary text-3xl font-bold border-b-2 border-primary w-3/5 text-center pb-4">World Technology</h2>
                {!worldTechEditDisplayed && worldTechDisplayed && (
                    <>
                        <p className="text-xl text-primary font-semibold p-10">{worldTechnologyDetails}</p>
                        <button className="text-2xl text-background font-bold bg-primary px-4 py-2 rounded-full w-1/3" onClick={() => {setWorldTechEditDisplayed(true)}}>
                            Edit
                        </button>
                    </>
                )}
                <div className={`flex flex-col w-5/6 items-center ${worldTechEditDisplayed ? 'block' : 'hidden'}`}>
                    <TextareaAutosize className={`text-xl font-semibold text-primary p-6 w-full bg-background resize-none outline-none border-2 border-primary rounded-2xl mt-8 overflow-hidden`}
                        value={worldTechnologyDetails}
                        onChange={ev => setWorldTechnologyDetails(ev.target.value)}
                    />
                    <button className="text-2xl text-background font-bold bg-primary px-4 py-2 rounded-full w-1/3 mt-6" onClick={() => {setWorldTechEditDisplayed(false)}}>
                        Save
                    </button>
                </div>
                {worldTechnologyDetails !== '' && (
                    <>
                        <button className={`text-background bg-primary border-2 border-primary transition-all duration-200 hover:text-primary hover:bg-background rounded-full font-bold flex flex-col items-center text-lg mt-10 w-4/5 ${worldTechEditDisplayed ? 'hidden' : 'block'}`} onClick={() => {
                                worldTechDisplayed ? setWorldTechDisplayed(false) : setWorldTechDisplayed(true);
                            }}>
                            {worldTechDisplayed ? (
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
                    </>
                )}
            </div>


            <div className="flex flex-col mt-12 items-center w-4/5 border-2 border-primary px-6 py-10 rounded-3xl">
                <h2 className="text-primary text-3xl font-bold border-b-2 border-primary w-3/5 text-center pb-4">World Economy</h2>
                {!worldEconEditDisplayed && worldEconDisplayed && (
                    <>
                        <p className="text-xl text-primary font-semibold p-10">{worldEconomyDetails}</p>
                        <button className="text-2xl text-background font-bold bg-primary px-4 py-2 rounded-full w-1/3" onClick={() => {setWorldEconEditDisplayed(true)}}>
                            Edit
                        </button>
                    </>
                )}
                <div className={`flex flex-col w-5/6 items-center ${worldEconEditDisplayed ? 'block' : 'hidden'}`}>
                    <TextareaAutosize className={`text-xl font-semibold text-primary p-6 w-full bg-background resize-none outline-none border-2 border-primary rounded-2xl mt-8 overflow-hidden`}
                        value={worldEconomyDetails}
                        onChange={ev => setWorldEconomyDetails(ev.target.value)}
                    />
                    <button className="text-2xl text-background font-bold bg-primary px-4 py-2 rounded-full w-1/3 mt-6" onClick={() => {setWorldEconEditDisplayed(false)}}>
                        Save
                    </button>
                </div>
                {worldEconomyDetails !== '' && (
                    <>
                        <button className={`text-background bg-primary border-2 border-primary transition-all duration-200 hover:text-primary hover:bg-background rounded-full font-bold flex flex-col items-center text-lg mt-10 w-4/5 ${worldEconEditDisplayed ? 'hidden' : 'block'}`} onClick={() => {
                                worldEconDisplayed ? setWorldEconDisplayed(false) : setWorldEconDisplayed(true);
                            }}>
                            {worldEconDisplayed ? (
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
                    </>
                )}
            </div>
            <button className="text-background bg-primary border-2 border-primary text-3xl font-bold rounded-full w-1/2 mt-12 py-2 transition-all duration-200 hover:text-primary hover:bg-background" onClick={() => {
                saveWorldInfo();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>Save world info</button>
        </div>
    );
}
 
export default WorldInfo;