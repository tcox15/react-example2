import axios from "axios";
import { useEffect, useState } from "react";

const PowersInput = ({
    characterPowers, setCharacterPowers,
    characterPowerType, setCharacterPowerType,
    characterPowersOfType, setCharacterPowersOfType,
    inputPowerOfType, setInputPowerOfType, id
}) => {
    
    const [addPowerDisplay, setAddPowerDisplay] = useState('hidden');
    const [addPowerButtonDisplay, setAddPowerButtonDisplay] = useState('block')

    const savePower = (ev) => {
        ev.preventDefault();
        const power = {
            powerType: characterPowerType,
            powersOfType: characterPowersOfType
        }
        setCharacterPowers([...characterPowers, power]);
        setCharacterPowerType('');
        setCharacterPowersOfType([]);
        setInputPowerOfType('');
    };

    const deletePower = (index) => {
        try {
            const newCharacterPowers = characterPowers.filter((power, i) => i !== index);
            setCharacterPowers(newCharacterPowers);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <label className="text-3xl font-bold text-primary block mb-6 mt-6">Powers</label>
                <div className="w-full flex flex-col items-center">
                    <div className="w-full px-7 flex flex-wrap justify-center gap-10">
                        {characterPowers.length > 0 && characterPowers.map((characterPower, index) => (
                        <div key={index} className="border-2 w-2/5 py-10 border-primary rounded-2xl mb-6 font-bold text-primary text-2xl relative">
                            <h2 className="mb-4">{characterPower.powerType}</h2>
                            <div className="flex flex-col items-center">
                                {characterPower.powersOfType.length > 0 && characterPower.powersOfType.map((power, index) => (
                                <p key={index} className="text-lg mb-4 py-2 border w-5/6 border-primary rounded-xl text-background bg-primary px-4 mx-2">{power}</p>
                                ))}
                            </div>
                            <button className="absolute top-3 right-3 transition-all border-2 border-primary p-1 rounded-full duration-200 hover:bg-primary hover:text-background" onClick={() => {deletePower(index)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </div>
                        ))}
                    </div>
                    <div className={`w-4/5 rounded-2xl px-6 py-6 mb-6 border-2 border-primary ${addPowerDisplay}`}>
                        <label className="text-2xl text-left font-semibold text-primary block mb-4">Power type</label>
                        <input
                            type="text"
                            autoComplete="off"
                            spellCheck="false"
                            autoCorrect="off"
                            value={characterPowerType}
                            onChange={ev => setCharacterPowerType(ev.target.value)}
                            placeholder={`eg. "Fire magic", "Superpower", "Bloodline trait", etc`}
                            className="bg-transparent w-full outline-none border-2 border-primary py-2 px-4 text-xl placeholder:text-lg font-semibold rounded-2xl text-secondary"/>
                        <div className="relative">
                            <label className="text-2xl text-left font-semibold text-primary block mt-6 mb-4">Powers of type</label>
                            {characterPowersOfType.length > 0 && characterPowersOfType.map((power, index) => (
                                <ul className="list_decorations mb-4" key={index}>
                                    <li className="text-xl mb-2 font-semibold text-primary text-left">
                                        {power}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 p-1 border-2 border-primary inline cursor-pointer bg-background text-primary rounded-full ml-4 mb-1 transition-all duration-200 hover:bg-primary hover:text-background" onClick={() => {setCharacterPowersOfType([...characterPowersOfType].filter((_, i) => i !== index))}}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </li>
                                </ul>
                            ))}
                            <input
                                type="text"
                                autoComplete="off"
                                spellCheck="false"
                                onKeyDown={ev => {
                                    if (ev.key === 'Enter') {
                                        ev.preventDefault();
                                        setCharacterPowersOfType([...characterPowersOfType, inputPowerOfType]);
                                        setInputPowerOfType('');
                                    }
                                }}
                                autoCorrect="off"
                                value={inputPowerOfType}
                                onChange={ev => setInputPowerOfType(ev.target.value)}
                                placeholder={`eg. "Fireball", "Superstrength", "Ice lance", etc.`}
                                className="bg-transparent h-16 w-full font-semibold outline-none border-2 border-primary py-2 px-4 placeholder:text-lg text-xl rounded-2xl text-secondary"/>
                            <button className="absolute right-2 mt-3 bg-primary border-2 border-background text-xl font-semibold px-4 py-1 rounded-2xl transition-all duration-200 hover:bg-background hover:border-primary hover:text-primary" onClick={(ev) => {
                                    ev.preventDefault();
                                    setCharacterPowersOfType([...characterPowersOfType, inputPowerOfType]);
                                    setInputPowerOfType('');
                            }}>Add to list</button>
                        </div>
                        <button className="bg-primary w-full flex justify-center items-center gap-2 border-2 border-background rounded-full text-2xl font-bold px-4 py-1 transition-all duration-200 hover:bg-background hover:border-primary hover:text-primary mt-6" onClick={ev => {savePower(ev); setAddPowerDisplay('hidden'); setAddPowerButtonDisplay('block')}}>Save power</button>
                    </div>
                <button className={`bg-primary w-1/2 flex justify-center items-center gap-2 border-2 border-background rounded-full text-2xl font-bold px-4 py-2 transition-all duration-200 hover:bg-background hover:border-primary hover:text-primary mb-5 ${addPowerButtonDisplay}`} onClick={() => {setAddPowerDisplay('block'); setAddPowerButtonDisplay('hidden')}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-0.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add power
                </button>
            </div>
        </div>
    );
}
 
export default PowersInput;