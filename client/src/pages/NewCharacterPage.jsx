import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PowersInput from "../partials/PowersInput";
import EquipmentInput from "../partials/EquipmentInput";
import TextareaAutosize from "react-textarea-autosize";

const NewCharacterPage = ({characters = [], setCharacters}) => {

    const { id } = useParams();

    const [characterData, setCharacterData] = useState({});
    const [characterName, setCharacterName] = useState('');
    const [characterGender, setCharacterGender] = useState('');
    const [characterAppearance, setCharacterAppearance] = useState([]);
    const [characterPersonality, setCharacterPersonality] = useState([]);
    const [characterAffiliations, setCharacterAffiliations] = useState([]);
    const [characterRace, setCharacterRace] = useState('');
    const [characterPowers, setCharacterPowers] = useState([]);
    const [characterPowerType, setCharacterPowerType] = useState('');
    const [characterPowersOfType, setCharacterPowersOfType] = useState([]);
    const [characterEquipment, setCharacterEquipment] = useState([]);
    const [characterEquipmentType, setCharacterEquipmentType] = useState('');
    const [characterEquipmentName, setCharacterEquipmentName] = useState('');
    const [characterEquipmentDescription, setCharacterEquipmentDescription] = useState('');
    const [backgroundInfo, setBackgroundInfo] = useState('');

    const [isMaleChecked, setIsMaleChecked] = useState(false);
    const [isFemaleChecked, setIsFemaleChecked] = useState(false);
    const [inputAppearance, setInputAppearance] = useState('');
    const [inputPersonality, setInputPersonality] = useState('');
    const [inputAffiliation, setInputAffiliation] = useState('');
    const [inputPowerOfType, setInputPowerOfType] = useState('');

    const [isCharacterDataUpdated, setIsCharacterDataUpdated] = useState(false);

    const navigate = useNavigate();

    const capFirst = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const capFirstAll = (string) => {
        return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const saveCharacter = async (ev) => {
        ev.preventDefault();
        setCharacterData({
            name: characterName,
            gender: characterGender,
            appearance: characterAppearance,
            personality: characterPersonality,
            affiliations: characterAffiliations,
            race: characterRace,
            powers: characterPowers,
            equipment: characterEquipment,
            backgroundInfo
        });
        setIsCharacterDataUpdated(true);
    }

    useEffect(() => {
        if (isCharacterDataUpdated) {
            setCharacters([...characters, characterData]);
            axios.put(`/${id}/characters/new`, characterData);
            navigate(`/books/${id}/characters`);
            setIsCharacterDataUpdated(false);     
        }
    }, [isCharacterDataUpdated])

    return (
        <div className="flex flex-col items-center">

            <h1 className="text-5xl font-bold text-primary block mt-5 cursor-default">Character Creator</h1>


            <form className="mt-5 w-3/5" onSubmit={ev => ev.preventDefault()}>
                <label className="text-3xl font-bold text-primary block mb-4 mt-6">Name</label>
                <input
                    type="text"
                    autoComplete="off"
                    spellCheck="false"
                    autoCorrect="off"
                    value={characterName}
                    onChange={ev => setCharacterName(capFirstAll(ev.target.value))}
                    placeholder="full name"
                    className="bg-transparent w-full outline-none border-2 border-primary py-2 px-4 text-xl rounded-2xl text-secondary"/>


                <label className="text-3xl font-bold text-primary block mb-4 mt-6">Gender</label>
                <div className="flex items-center justify-center">
                    <label className="tags w-full mr-6">
                        <input type="checkbox" className="tagsCheck" name="male" onChange={() => {setIsMaleChecked(true); setIsFemaleChecked(false); setCharacterGender('male')}} checked={isMaleChecked}/>
                        <span className="customCheckbox"></span>
                        <img src='/male-gender.png' className="w-10"/>
                        <span className="font-semibold">male</span>
                    </label>
                    <label className="tags w-full">
                        <input type="checkbox" className="tagsCheck" name="female" onChange={() => {setIsMaleChecked(false); setIsFemaleChecked(true); setCharacterGender('female')}} checked={isFemaleChecked}/>
                        <span className="customCheckbox"></span>
                        <img src='/female.png' className="w-10"/>
                        <span className="font-semibold">female</span>
                    </label>
                </div>


                <label className="text-3xl font-bold text-primary block mb-4 mt-6">Race</label>
                <input
                    type="text"
                    autoComplete="off"
                    spellCheck="false"
                    autoCorrect="off"
                    value={characterRace}
                    onChange={ev => setCharacterRace(capFirst(ev.target.value))}
                    placeholder="what race is your character"
                    className="bg-transparent w-full outline-none border-2 border-primary py-2 px-4 text-xl rounded-2xl text-secondary"/>


                <div className="relative">
                    <label className="text-3xl font-bold text-primary block mb-4 mt-6">Appearance</label>
                    {characterAppearance.length > 0 && characterAppearance.map((look, index) => (
                        <ul className="list_decorations mb-4" key={index}>
                            <li className="text-xl mb-2 font-semibold text-primary">
                                {look}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 p-1 inline cursor-pointer text-primary border-2 border-primary rounded-full ml-4 mb-1 transition-all duration-200 hover:bg-primary hover:text-background" onClick={() => {setCharacterAppearance([...characterAppearance].filter((_, i) => i !== index))}}>
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
                                setCharacterAppearance([...characterAppearance, inputAppearance]);
                                setInputAppearance('');
                            }
                        }}
                        autoCorrect="off"
                        value={inputAppearance}
                        onChange={ev => setInputAppearance(capFirst(ev.target.value))}
                        placeholder="list how the character looks"
                        className="bg-transparent h-16 w-full outline-none border-2 border-primary py-2 px-4 text-xl rounded-2xl text-secondary"/>
                    <button className="absolute right-2 mt-3 bg-primary border-2 border-background text-xl font-semibold px-4 py-1 rounded-2xl transition-all duration-200 hover:bg-background hover:border-primary hover:text-primary" onClick={(ev) => {
                        ev.preventDefault();
                        setCharacterAppearance([...characterAppearance, inputAppearance]);
                        setInputAppearance('');
                    }}>Add to list</button>
                </div>


                <div className="relative">
                    <label className="text-3xl font-bold text-primary block mb-4 mt-6">Personality</label>
                    {characterPersonality.length > 0 && characterPersonality.map((trait, index) => (
                        <ul className="list_decorations mb-4" key={index}>
                            <li className="text-xl mb-2 font-semibold text-primary">
                                {trait}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 p-1 inline cursor-pointer text-primary border-2 border-primary rounded-full ml-4 mb-1 transition-all duration-200 hover:bg-primary hover:text-background" onClick={() => {setCharacterPersonality([...characterPersonality].filter((_, i) => i !== index))}}>
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
                                setCharacterPersonality([...characterPersonality, inputPersonality]);
                                setInputPersonality('');
                            }
                        }}
                        autoCorrect="off"
                        value={inputPersonality}
                        onChange={ev => setInputPersonality(capFirst(ev.target.value))}
                        placeholder="list how the character acts"
                        className="bg-transparent h-16 w-full outline-none border-2 border-primary py-2 px-4 text-xl rounded-2xl text-secondary"/>
                    <button className="absolute right-2 mt-3 bg-primary border-2 border-background text-xl font-semibold px-4 py-1 rounded-2xl transition-all duration-200 hover:bg-background hover:border-primary hover:text-primary" onClick={(ev) => {
                            ev.preventDefault();
                            setCharacterPersonality([...characterPersonality, inputPersonality]);
                            setInputPersonality('');
                        }}>Add to list</button>
                </div>


                <div className="relative">
                    <label className="text-3xl font-bold text-primary block mb-4 mt-6">Affiliations</label>
                    {characterAffiliations.length > 0 && characterAffiliations.map((affiliation, index) => (
                        <ul className="list_decorations mb-4" key={index}>
                            <li className="text-xl mb-2 font-semibold text-primary">
                                {affiliation}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 p-1 inline cursor-pointer text-primary border-2 border-primary rounded-full ml-4 mb-1 transition-all duration-200 hover:bg-primary hover:text-background" onClick={() => {setCharacterAffiliations([...characterAffiliations].filter((_, i) => i !== index))}}>
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
                                setCharacterAffiliations([...characterAffiliations, inputAffiliation]);
                                setInputAffiliation('');
                            }
                        }}
                        autoCorrect="off"
                        value={inputAffiliation}
                        onChange={ev => setInputAffiliation(capFirst(ev.target.value))}
                        placeholder="list who or what the character is affiliated with"
                        className="bg-transparent h-16 w-full outline-none border-2 border-primary py-2 px-4 text-xl rounded-2xl text-secondary"/>
                    <button className="absolute right-2 mt-3 bg-primary border-2 border-background text-xl font-semibold px-4 py-1 rounded-2xl transition-all duration-200 hover:bg-background hover:border-primary hover:text-primary" onClick={(ev) => {
                            ev.preventDefault();
                            setCharacterAffiliations([...characterAffiliations, inputAffiliation]);
                            setInputPersonality('');
                        }}>Add to list</button>
                </div>

                <div className="border-2 text-center border-primary px-6 rounded-2xl mt-10">
                    <PowersInput 
                        characterPowers={characterPowers}
                        setCharacterPowers={setCharacterPowers}
                        characterPowerType={characterPowerType}
                        setCharacterPowerType={setCharacterPowerType}
                        characterPowersOfType={characterPowersOfType}
                        setCharacterPowersOfType={setCharacterPowersOfType}
                        inputPowerOfType={inputPowerOfType}
                        setInputPowerOfType={setInputPowerOfType}
                        id={id}
                    />
                </div>

                <div className="border-2 text-center border-primary px-6 rounded-2xl mt-10">
                    <EquipmentInput 
                        characterEquipment={characterEquipment}
                        setCharacterEquipment={setCharacterEquipment}
                        characterEquipmentType={characterEquipmentType}
                        setCharacterEquipmentType={setCharacterEquipmentType}
                        characterEquipmentName={characterEquipmentName}
                        setCharacterEquipmentName={setCharacterEquipmentName}
                        characterEquipmentDescription={characterEquipmentDescription}
                        setCharacterEquipmentDescription={setCharacterEquipmentDescription}
                    />
                </div>
                <div>
                    <label className="text-3xl font-bold text-primary block mb-4 mt-6">Background info</label>
                    <TextareaAutosize
                        className="border-2 border-primary overflow-hidden min-h-40 outline-none bg-background rounded-2xl py-6 px-10 w-full resize-none text-xl text-secondary font-semibold"
                        placeholder="info about the character"
                        value={backgroundInfo}
                        onChange={ev => setBackgroundInfo(capFirst(ev.target.value))}
                    />
                </div>


                <Link to={'/books/' + id + '/characters'} className="bg-primary block text-center border-2 border-background rounded-full text-2xl font-bold px-4 py-2 mt-14 mb-24 transition-all duration-200 hover:bg-background hover:border-primary hover:text-primary" onClick={(ev) => saveCharacter(ev)}>Save character</Link>


            </form>
        </div>
    );
}
 
export default NewCharacterPage;