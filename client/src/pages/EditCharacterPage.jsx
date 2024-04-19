import { useNavigate, useParams } from "react-router-dom";
import SinglePageNav from "../partials/SinglePageNav";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";

const EditCharacterPage = () => {

    const { id: bookId, characterId } = useParams();

    const navigate = useNavigate();

    const nameRef = useRef();
    const raceAndGenderRef = useRef();
    const addAppearanceRef = useRef();

    const [nameEditDisplay, setNameEditDisplay] = useState('hidden');
    const [nameTextDisplay, setNameTextDisplay] = useState('block');
    
    const [genderAndRaceEditDisplay, setGenderAndRaceEditDisplay] = useState('hidden');
    const [genderAndRaceTextDisplay, setGenderAndRaceTextDisplay] = useState('block');

    const [appearanceEditDisplay, setAppearanceEditDisplay] = useState('hidden');
    const [appearanceTextDisplay, setAppearanceTextDisplay] = useState('flex');

    const [personalityEditDisplay, setPersonalityEditDisplay] = useState('hidden');
    const [personalityTextDisplay, setPersonalityTextDisplay] = useState('flex');
    
    const [affiliationsEditDisplay, setAffiliationsEditDisplay] = useState('hidden');
    const [affiliationsTextDisplay, setAffiliationsTextDisplay] = useState('flex');

    const [powersEditDisplay, setPowersEditDisplay] = useState('hidden');
    const [powersTextDisplay, setPowersTextDisplay] = useState('flex');

    const [inputPowerDisplay, setInputPowerDisplay] = useState('hidden');
    const [addPowerButtonDisplay, setAddPowerButtonDisplay] = useState('block');

    const [equipmentEditDisplay, setEquipmentEditDisplay] = useState('hidden');
    const [equipmentTextDisplay, setEquipmentTextDisplay] = useState('block');

    const [addEquipmentButtonDisplay, setAddEquipmentButtonDisplay] = useState('block');
    const [addEquipmentDisplay, setAddEquipmentDisplay] = useState('hidden');

    const [editCharacterButton, setEditCharacterButton] = useState('block');
    const [finishEditingButton, setFinishEditingButton] = useState('hidden');

    const [backgroundInfoDisabled, setbackgroundInfoDisabled] = useState(true);

    const [name, setName] = useState('');
    const [nameInputValue, setNameInputValue] = useState('');
    const [gender, setGender] = useState('');
    const [genderAndRaceInputValue, setGenderAndRaceInputValue] = useState('');
    const [race, setRace] = useState('');
    const [backgroundInfo, setBackgroundInfo] = useState('');
    const [appearance, setAppearance] = useState([]);
    const [inputAppearance, setInputAppearance] = useState('');
    const [personality, setPersonality] = useState([]);
    const [inputPersonality, setInputPersonality] = useState('');
    const [affiliations, setAffiliations] = useState([]);
    const [inputAffiliations, setInputAffiliations] = useState('');
    const [powers, setPowers] = useState([]);
    const [powerType, setPowerType] = useState('');
    const [powersOfType, setPowersOfType] = useState([]);
    const [inputPowerType, setInputPowerType] = useState('');
    const [inputPowerOfType, setInputPowerOfType] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [equipmentType, setEquipmentType] = useState('');
    const [equipmentName, setEquipmentName] = useState('');
    const [equipmentDescription, setEquipmentDescription] = useState('');

    const capFirst = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const capFirstAll = (string) => {
        return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const savePower = () => {
        const newPower = {
            powerType, powersOfType
        };
        setPowers([...powers, newPower]);
        setPowerType('');
        setPowersOfType([]);
        setInputPowerOfType('');
    };

    const saveEquipment = () => {
        const newEquipment = {
            equipmentType,
            equipmentName,
            equipmentDescription
        };
        setEquipment([...equipment, newEquipment]);
        setEquipmentType('');
        setEquipmentName('');
        setEquipmentDescription('');
    };

    const saveCharacterChanges = async () => {
        try {
            const characterInfo = { name, gender, race, backgroundInfo, appearance, personality, affiliations, powers, equipment };
            console.log(characterInfo);
            await axios.put(`/books/${bookId}/character/${characterId}`, characterInfo);
            navigate(`/books/${bookId}/characters`);
        } catch (err) {
            console.log(err);
        }
    }
    
    useEffect(() => {
        if (bookId && characterId) {
            axios.get(`/books/${bookId}/character/${characterId}`)
                .then((response) => {
                    const { data } = response;
                    setName(capFirst(data[0].name));
                    setGender(capFirst(data[0].gender));
                    setRace(capFirst(data[0].race));
                    setBackgroundInfo(data[0].backgroundInfo);
                    setAppearance(data[0].appearance);
                    setPersonality(data[0].personality);
                    setAffiliations(data[0].affiliations);
                    setPowers(data[0].powers);
                    setEquipment(data[0].equipment);
                });
        }
    }, [characterId]);

    return (
        <div className="flex flex-col mx-14 mb-24 items-center">
            <SinglePageNav/>
            <div className="w-5/6 py-14 rounded-3xl p-8 flex flex-col gap-6 items-center justify-center">
                <h1 className={`text-8xl cursor-default text-primary font-bold flex justify-center items-center relative ${nameTextDisplay}`}>
                    <span className="transition-all duration-300">{name}</span>
                </h1>
                <input
                    ref={nameRef}
                    type="text"
                    spellCheck="false"
                    onKeyUp={(ev) => {
                        if (ev.key === 'Enter') {
                            setNameEditDisplay('hidden');
                            setNameTextDisplay('block');
                            setNameInputValue('');
                            raceAndGenderRef.current.focus();
                        }
                    }}
                    className={`border-none -mt-5 outline-none text-primary bg-background text-center text-8xl font-bold ${nameEditDisplay}`} placeholder={name} value={nameInputValue}

                    onChange={ev => {setName(capFirstAll(ev.target.value)); setNameInputValue(capFirstAll(ev.target.value))}}
                />

                <div className="genderAndRaceContainer cursor-default text-4xl text-primary font-semibold pb-4 pt-2 text-center flex justify-center items-center">
                    <p className={`${genderAndRaceTextDisplay}`}>{gender} {race}</p>
                    <div className={`${genderAndRaceEditDisplay}`}>
                        <input
                            ref={raceAndGenderRef}
                            type="text"
                            spellCheck="false"
                            className="border-none outline-none bg-background text-center"
                            placeholder={`${gender} ${race}`}
                            value={genderAndRaceInputValue}
                            onChange={ev => {
                                const words = ev.target.value.split(' ');
                                if (words.length === 2) {
                                    setGender(capFirst(words[0]));
                                    setRace(capFirst(words[1]));
                                }
                                setGenderAndRaceInputValue(capFirstAll(ev.target.value));
                            }}
                            onKeyUp={ev => {
                                if (ev.key === 'Enter') {
                                    setGenderAndRaceEditDisplay('hidden');
                                    setGenderAndRaceTextDisplay('block');
                                    addAppearanceRef.current.focus();
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="w-5/6 p-8 border-2 border-primary rounded-3xl">
                <h2 className="text-3xl cursor-default text-primary font-bold mb-5 w-full border-b-2 border-primary pb-5">Appearance:</h2>
                <div className={`${appearanceTextDisplay} flex-wrap justify-center relative appearanceContainer`}>
                    {appearance && appearance.map((look, index) => (
                        <span key={index} className="text-xl cursor-default text-background bg-primary m-4 rounded-full px-4 py-1 font-semibold">{capFirst(look)}</span>
                    ))}
                </div>
                <div className={`relative ${appearanceEditDisplay}`}>
                    {appearance && appearance.map((look, index) => (
                        <ul className="list_decorations mb-4" key={index}>
                            <li className="text-2xl mb-6 font-semibold text-primary">
                                {look}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 p-1 inline cursor-pointer text-primary border-2 border-primary rounded-full ml-4 mb-1 transition-all duration-200 hover:bg-primary hover:text-background" onClick={() => {setAppearance([...appearance].filter((_, i) => i !== index))}}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </li>
                        </ul>
                    ))}
                    <input
                        ref={addAppearanceRef}
                        type="text"
                        autoComplete="off"
                        spellCheck="false"
                        onKeyDown={ev => {
                            if (ev.key === 'Enter') {
                                ev.preventDefault();
                                setAppearance([...appearance, inputAppearance]);
                                setInputAppearance('');
                            }
                        }}
                        autoCorrect="off"
                        value={inputAppearance}
                        onChange={ev => setInputAppearance(capFirst(ev.target.value))}
                        placeholder="list how the character looks"
                        className="bg-transparent h-16 w-full outline-none border-2 border-primary py-2 px-4 text-2xl rounded-2xl text-secondary font-semibold"/>
                    <button className="absolute right-2 mt-3 bg-primary border-2 border-background text-xl font-semibold px-4 py-1 rounded-2xl transition-all duration-200 hover:bg-background hover:border-primary hover:text-primary" onClick={(ev) => {
                        ev.preventDefault();
                        setAppearance([...appearance, inputAppearance]);
                        setInputAppearance('');
                    }}>Add to list</button>
                    <button className="w-full rounded-full bg-primary text-2xl border-2 border-primary text-background py-2 mt-6 font-bold transition-all duration-200 hover:bg-background hover:text-primary" onClick={() => {setAppearanceEditDisplay('hidden'); setAppearanceTextDisplay('flex')}}>Save appearance</button>
                </div>
            </div>


            <div className="w-5/6 p-8 mt-10 border-2 border-primary rounded-3xl">
                <h2 className="text-3xl cursor-default text-primary font-bold mb-5 w-full border-b-2 border-primary pb-5">Personality:</h2>
                <div className={`${personalityTextDisplay} flex-wrap justify-center appearanceContainer`}>
                    {personality && personality.map((trait, index) => (
                        <span key={index} className="text-xl cursor-default text-background bg-primary m-4 rounded-full px-4 py-1 font-semibold">{capFirst(trait)}</span>
                    ))}
                </div>
                <div className={`relative ${personalityEditDisplay}`}>
                    {personality && personality.map((trait, index) => (
                        <ul className="list_decorations mb-4" key={index}>
                            <li className="text-2xl mb-6 font-semibold text-primary">
                                {trait}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 p-1 inline cursor-pointer text-primary border-2 border-primary rounded-full ml-4 mb-1 transition-all duration-200 hover:bg-primary hover:text-background" onClick={() => {setPersonality([...personality].filter((_, i) => i !== index))}}>
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
                                setPersonality([...personality, inputPersonality]);
                                setInputPersonality('');
                            }
                        }}
                        autoCorrect="off"
                        value={inputPersonality}
                        onChange={ev => setInputPersonality(capFirst(ev.target.value))}
                        placeholder="list how the character acts"
                        className="bg-transparent h-16 w-full outline-none border-2 border-primary py-2 px-4 text-2xl rounded-2xl text-secondary font-semibold"/>
                    <button className="absolute right-2 mt-3 bg-primary border-2 border-background text-xl font-semibold px-4 py-1 rounded-2xl transition-all duration-200 hover:bg-background hover:border-primary hover:text-primary" onClick={(ev) => {
                        ev.preventDefault();
                        setPersonality([...personality, inputPersonality]);
                        setInputPersonality('');
                    }}>Add to list</button>
                    <button className="w-full rounded-full bg-primary text-2xl border-2 border-primary text-background py-2 mt-6 font-bold transition-all duration-200 hover:bg-background hover:text-primary" onClick={() => {setPersonalityEditDisplay('hidden'); setPersonalityTextDisplay('flex')}}>Save personality</button>
                </div>
            </div>


            <div className="w-5/6 p-8 mt-10 border-2 border-primary rounded-3xl">
                <h2 className="text-3xl cursor-default text-primary font-bold mb-5 w-full border-b-2 border-primary pb-5">Affiliations:</h2>
                <div className={`${affiliationsTextDisplay} flex-wrap justify-center appearanceContainer`}>
                    {affiliations && affiliations.map((affiliation, index) => (
                        <span key={index} className="text-xl cursor-default text-background bg-primary m-4 rounded-full px-4 py-1 font-semibold">{capFirst(affiliation)}</span>
                    ))}
                </div>
                <div className={`relative ${affiliationsEditDisplay}`}>
                    {affiliations && affiliations.map((affiliation, index) => (
                        <ul className="list_decorations mb-4" key={index}>
                            <li className="text-2xl mb-6 font-semibold text-primary">
                                {affiliation}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 p-1 inline cursor-pointer text-primary border-2 border-primary rounded-full ml-4 mb-1 transition-all duration-200 hover:bg-primary hover:text-background" onClick={() => {setAffiliations([...affiliations].filter((_, i) => i !== index))}}>
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
                                setAffiliations([...affiliations, inputAffiliations]);
                                setInputAffiliations('');
                            }
                        }}
                        autoCorrect="off"
                        value={inputAffiliations}
                        onChange={ev => setInputAffiliations(capFirst(ev.target.value))}
                        placeholder="list how the character acts"
                        className="bg-transparent h-16 w-full outline-none border-2 border-primary py-2 px-4 text-2xl rounded-2xl text-secondary font-semibold"/>
                    <button className="absolute right-2 mt-3 bg-primary border-2 border-background text-xl font-semibold px-4 py-1 rounded-2xl transition-all duration-200 hover:bg-background hover:border-primary hover:text-primary" onClick={(ev) => {
                        ev.preventDefault();
                        setAffiliations([...affiliations, inputAffiliations]);
                        setInputAffiliations('');
                    }}>Add to list</button>
                    <button className="w-full rounded-full bg-primary text-2xl border-2 border-primary text-background py-2 mt-6 font-bold transition-all duration-200 hover:bg-background hover:text-primary" onClick={() => {setAffiliationsEditDisplay('hidden'); setAffiliationsTextDisplay('flex')}}>Save affilations</button>
                </div>
            </div>


            <div className="border-2 border-primary w-5/6 mt-10 rounded-3xl p-8 flex flex-col">
                <h2 className="text-3xl cursor-default text-primary font-bold mb-5 w-full border-b-2 border-primary pb-5">Background:</h2>
                <TextareaAutosize
                    className="resize-none whitespace-pre-line outline-none border-none px-4 bg-background text-2xl font-semibold text-primary w-full flex-grow"
                    disabled={backgroundInfoDisabled}
                    value={backgroundInfo}
                    onChange={ev => setBackgroundInfo(capFirst(ev.target.value))}
                />
            </div>


            <div className="w-5/6 p-8 mt-10 border-2 border-primary rounded-3xl flex flex-col items-center">
                <h2 className="text-3xl cursor-default text-primary font-bold mb-5 w-full border-b-2 border-primary pb-5">Powers:</h2>
                <div className={`${powersTextDisplay} flex-wrap flex-grow justify-center items appearanceContainer w-4/5`}>
                    {powers && powers.map((power, index) => (
                        <div key={index} className="text-2xl flex-grow flex flex-col items-center border-2 border-primary text-primary bg-background m-4 rounded-2xl px-4 py-5 pb-10 font-semibold">
                        
                            <span className="font-bold cursor-default border-b-2 pb-2 border-primary">{capFirstAll(power.powerType)}</span>
                            {power.powersOfType && power.powersOfType.map((power, index) => (
                                <span key={index} className="mt-3 cursor-default block">- {power} -</span>
                            ))}
                        </div>
                    ))}
                </div>
                <div className={`w-4/5 flex flex-col items-center ${powersEditDisplay}`}>
                    <div className={`w-full flex flex-wrap justify-center gap-10 my-10`}>
                        {powers && powers.map((power, index) => (
                        <div key={index} className="border-2 flex-grow py-5 border-primary rounded-2xl font-bold text-primary text-2xl relative">
                            <h2 className="mb-6 text-center">{power.powerType}</h2>
                            <div className="flex flex-wrap items-center justify-center">
                                {power.powersOfType.length > 0 && power.powersOfType.map((power, index) => (
                                <p key={index} className="text-lg mb-4 py-2 border border-primary rounded-xl text-background bg-primary px-4 mx-2">{power}</p>
                                ))}
                            </div>
                            <button className="absolute top-3 right-3 transition-all border-2 border-primary p-1 rounded-full duration-200 hover:bg-primary hover:text-background">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={() => {setPowers([...powers].filter((_, i) => i !== index))}}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </div>
                        ))}
                        <button className={`bg-background text-primary px-10 flex justify-center items-center gap-2 border-2 border-primary rounded-2xl text-2xl font-bold transition-all duration-200 hover:bg-primary hover:border-primary hover:text-background ${addPowerButtonDisplay}`} onClick={() => {setInputPowerDisplay('block'); setAddPowerButtonDisplay('hidden')}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-0.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add power
                        </button>
                    </div>
                    <div className={`w-full rounded-2xl px-6 py-6 mb-6 border-2 border-primary ${inputPowerDisplay}`}>
                        <label className="text-2xl text-left font-semibold text-primary block mb-4">Power type</label>
                        <input
                            type="text"
                            autoComplete="off"
                            spellCheck="false"
                            autoCorrect="off"
                            value={powerType}
                            onChange={ev => {setPowerType(capFirstAll(ev.target.value))}}
                            placeholder={`eg. "Fire magic", "Superpower", "Bloodline trait", etc`}
                            className="bg-transparent w-full outline-none border-2 border-primary py-2 px-4 text-xl placeholder:text-lg font-semibold rounded-2xl text-secondary"/>
                        <div className="relative">
                            <label className="text-2xl text-left font-semibold text-primary block mt-6 mb-4">Powers of type</label>
                            {powersOfType && powersOfType.map((power, index) => (
                                <ul className="list_decorations mb-4" key={index}>
                                    <li className="text-xl mb-2 font-semibold text-primary text-left">
                                        {power}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 p-1 border-2 border-primary inline cursor-pointer bg-background text-primary rounded-full ml-4 mb-1 transition-all duration-200 hover:bg-primary hover:text-background" onClick={() => {setPowersOfType([...powersOfType].filter((_, i) => i !== index))}}>
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
                                        setPowersOfType([...powersOfType, inputPowerOfType]);
                                        setInputPowerOfType('');
                                    }
                                }}
                                autoCorrect="off"
                                value={inputPowerOfType}
                                onChange={ev => setInputPowerOfType(capFirstAll(ev.target.value))}
                                placeholder={`eg. "Fireball", "Superstrength", "Ice lance", etc.`}
                                className="bg-transparent h-16 w-full font-semibold outline-none border-2 border-primary py-2 px-4 placeholder:text-lg text-xl rounded-2xl text-secondary"/>
                            <button className="absolute right-2 mt-3 bg-primary border-2 border-background text-xl font-semibold px-4 py-1 rounded-2xl transition-all duration-200 hover:bg-background hover:border-primary hover:text-primary" onClick={(ev) => {
                                        ev.preventDefault();
                                        setPowersOfType([...powersOfType, inputPowerOfType]);
                                        setInputPowerOfType('');
                                }}>Add to list
                            </button>
                        </div>
                        
                        <button className="bg-primary w-full flex justify-center items-center gap-2 border-2 border-background rounded-full text-2xl font-bold px-4 py-1 transition-all duration-200 hover:bg-background hover:border-primary hover:text-primary mt-6" onClick={() => {setInputPowerDisplay('hidden'); setAddPowerButtonDisplay('block'); savePower()}}>
                            Save power
                        </button>
                    </div>
                    
                    <button className={`bg-primary w-full flex justify-center items-center gap-2 border-2 border-background rounded-full text-2xl font-bold px-4 py-2 transition-all duration-200 hover:bg-background hover:border-primary hover:text-primary mb-5`} onClick={() => {setPowersEditDisplay('hidden'); setPowersTextDisplay('flex')}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Save powers
                    </button>
                </div>
            </div>


            <div className={` w-5/6 px-8 py-12 mt-10 border-2 border-primary rounded-3xl`}>
                <h2 className="text-3xl cursor-default text-primary font-bold w-full border-b-2 border-primary pb-5">Equipment:</h2>
                <div className={`equipmentTextContainer flex flex-col items-center ${equipmentTextDisplay}`}>
                    {equipment && equipment.map((item, index) => (
                    <div key={index} className="mt-14 border-2 border-primary w-full flex-grow rounded-2xl p-8 flex flex-col items-center">
                        <h3 className="text-3xl cursor-default text-primary font-bold text-center border-b-2 border-primary pb-2">{capFirstAll(item.equipmentName)} ({capFirst(item.equipmentType)})</h3>
                        <p className="mt-5 w-2/3 cursor-default text-xl text-primary font-semibold">{item.equipmentDescription}</p>
                    </div>
                    ))}
                </div>

                <div className={`w-full flex flex-col items-center ${equipmentEditDisplay}`}>
                    <div className="w-4/5 mt-4">
                        {equipment && equipment.map((item, index) => (
                            <div key={index} className="relative border-2 py-10 border-primary rounded-2xl mb-6 font-bold text-primary">
                                <p className="mb-5 font-bold text-2xl mx-12 pb-4 border-b-2 border-primary">{`${item.equipmentName} (${item.equipmentType})`}</p>
                                <p className="text-left text-xl ml-12 mb-2">Description:</p>
                                <p className="font-normal text-lg text-left px-12">{item.equipmentDescription}</p>
                                <button className="absolute top-3 right-3 transition-all border-2 border-primary p-1 rounded-full duration-200 hover:bg-primary hover:text-background" onClick={() => {setEquipment([...equipment].filter((_, i) => i !== index))}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className={`w-4/5 rounded-2xl px-6 py-6 mb-6 border-2 border-primary ${addEquipmentDisplay}`}>
                        <label className="text-2xl text-left font-semibold text-primary block mb-4">Equipment type</label>
                        <input
                            type="text"
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                            value={equipmentType}
                            onChange={ev => setEquipmentType(capFirstAll(ev.target.value))}
                            placeholder={`eg. "Sword", "Armor", "Accessory", etc`}
                            className="bg-transparent w-full outline-none border-2 border-primary py-2 px-4 text-xl placeholder:text-lg font-semibold rounded-2xl text-secondary mb-6"/>


                        <label className="text-2xl text-left font-semibold text-primary block mb-4">Equipment name</label>
                        <input
                            type="text"
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                            value={equipmentName}
                            onChange={ev => setEquipmentName(capFirstAll(ev.target.value))}
                            placeholder={`eg. "Excalibur", "Shield of Asuvux", "Invisible cloak", etc`}
                            className="bg-transparent w-full outline-none border-2 border-primary py-2 px-4 text-xl placeholder:text-lg font-semibold rounded-2xl text-secondary mb-6"/>


                        <label className="text-2xl text-left font-semibold text-primary block mb-4">Equipment description</label>
                        <textarea
                            value={equipmentDescription}
                            spellCheck="false"
                            onChange={ev => setEquipmentDescription(capFirst(ev.target.value))}
                            placeholder="Describe the equipment and what it does for the character"
                            className="bg-transparent w-full outline-none border-2 h-32 border-primary py-2 px-4 text-lg placeholder:text-lg font-semibold rounded-2xl text-secondary mb-2"/>

                        <button className="bg-primary w-full flex justify-center items-center gap-2 border-2 border-background rounded-full text-2xl font-bold px-4 py-1 transition-all duration-200 hover:bg-background hover:border-primary hover:text-primary mt-6" onClick={() => {saveEquipment(); setAddEquipmentDisplay('hidden'); setAddEquipmentButtonDisplay('block')}}>
                            Save item
                        </button>

                    </div>

                    <button className={`bg-primary w-1/2 flex justify-center items-center gap-2 border-2 border-background rounded-full text-2xl font-bold px-4 py-2 transition-all duration-200 hover:bg-background hover:border-primary hover:text-primary mb-5 ${addEquipmentButtonDisplay}`} onClick={() => {setAddEquipmentDisplay('block'); setAddEquipmentButtonDisplay('hidden')}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-0.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add Equipment
                    </button>

                    <button className={`bg-primary w-4/5 flex justify-center items-center gap-2 border-2 border-background rounded-full text-2xl font-bold px-4 py-2 transition-all duration-200 hover:bg-background hover:border-primary hover:text-primary mb-5`} onClick={() => {setEquipmentEditDisplay('hidden'); setEquipmentTextDisplay('flex')}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Save equipment
                    </button>

                </div>
            </div>

            <button className="bg-primary my-16 w-4/6 text-3xl border-2 border-primary font-bold py-2 rounded-full transition-all duration-200 hover:bg-background hover:text-primary" onClick={() => saveCharacterChanges()}>Save character</button>

            <button className={`bg-primary text-2xl border-2 px-4 absolute right-10 border-primary font-bold py-2 rounded-full transition-all duration-200 hover:bg-background hover:text-primary ${editCharacterButton}`}
                onClick={() => {

                    setFinishEditingButton('block');
                    setEditCharacterButton('hidden');
                    setNameTextDisplay('hidden');
                    setGenderAndRaceTextDisplay('hidden');
                    setAppearanceTextDisplay('hidden');
                    setPersonalityTextDisplay('hidden');
                    setAffiliationsTextDisplay('hidden');
                    setPowersTextDisplay('hidden');
                    setEquipmentTextDisplay('hidden');
                    setNameEditDisplay('block');
                    setGenderAndRaceEditDisplay('block');
                    setPersonalityEditDisplay('block');
                    setAppearanceEditDisplay('block');
                    setAffiliationsEditDisplay('block');
                    setPowersEditDisplay('block');
                    setEquipmentEditDisplay('block');
                    setbackgroundInfoDisabled(false);
                    nameRef.current.focus();

                }}>
                Edit Character
            </button>

            <button className={`bg-primary text-2xl border-2 px-4 absolute right-10 border-primary font-bold py-2 rounded-full transition-all duration-200 hover:bg-background hover:text-primary ${finishEditingButton}`}
                onClick={() => {

                    setFinishEditingButton('hidden');
                    setEditCharacterButton('block');
                    setNameTextDisplay('block');
                    setGenderAndRaceTextDisplay('block');
                    setAppearanceTextDisplay('flex');
                    setPersonalityTextDisplay('flex');
                    setAffiliationsTextDisplay('flex');
                    setPowersTextDisplay('flex');
                    setEquipmentTextDisplay('flex');
                    setNameEditDisplay('hidden');
                    setGenderAndRaceEditDisplay('hidden');
                    setPersonalityEditDisplay('hidden');
                    setAppearanceEditDisplay('hidden');
                    setAffiliationsEditDisplay('hidden');
                    setPowersEditDisplay('hidden');
                    setEquipmentEditDisplay('hidden');
                    setbackgroundInfoDisabled(true);

                }}>
                Finish editing
            </button>

        </div>
    );
}
 
export default EditCharacterPage;