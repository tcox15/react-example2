import { useState } from "react";

const EquipmentInput = ({
    characterEquipment, setCharacterEquipment,
    characterEquipmentType, setCharacterEquipmentType,
    characterEquipmentName, setCharacterEquipmentName,
    characterEquipmentDescription, setCharacterEquipmentDescription,
}) => {

    const [addEquipmentDisplay, setAddEquipmentDisplay] = useState('hidden');
    const [addEquipmentButtonDisplay, setAddEquipmentButtonDisplay] = useState('block')

    const saveEquipment = (ev) => {
        ev.preventDefault();
        const equipment = {
            equipmentType: characterEquipmentType,
            equipmentName: characterEquipmentName,
            equipmentDescription: characterEquipmentDescription
        }
        setCharacterEquipment([...characterEquipment, equipment]);
        setCharacterEquipmentType('');
        setCharacterEquipmentName('');
        setCharacterEquipmentDescription('');
    };

    const deleteEquipment = (index) => {
        try {
            const newCharacterEquipment = characterEquipment.filter((equipment, i) => i !== index);
            setCharacterEquipment(newCharacterEquipment);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <label className="text-3xl font-bold text-primary block mb-6 mt-6">Equipment</label>
            <div className="w-full flex flex-col items-center">
                <div className="w-4/5">
                    {characterEquipment.length > 0 && characterEquipment.map((characterEquipment, index) => (
                        <div key={index} className="relative border-2 py-10 border-primary rounded-2xl mb-6 font-bold text-primary">
                            <p className="mb-5 font-bold text-2xl">{`${characterEquipment.equipmentName} (${characterEquipment.equipmentType})`}</p>
                            <p className="text-left text-xl ml-12 mb-2">Description:</p>
                            <p className="font-normal text-lg text-left px-12">{characterEquipment.equipmentDescription}</p>
                            <button className="absolute top-3 right-3 transition-all border-2 border-primary p-1 rounded-full duration-200 hover:bg-primary hover:text-background" onClick={() => {deleteEquipment(index)}}>
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
                        value={characterEquipmentType}
                        onChange={ev => setCharacterEquipmentType(ev.target.value)}
                        placeholder={`eg. "Sword", "Armor", "Accessory", etc`}
                        className="bg-transparent w-full outline-none border-2 border-primary py-2 px-4 text-xl placeholder:text-lg font-semibold rounded-2xl text-secondary mb-6"/>


                    <label className="text-2xl text-left font-semibold text-primary block mb-4">Equipment name</label>
                    <input
                        type="text"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                        value={characterEquipmentName}
                        onChange={ev => setCharacterEquipmentName(ev.target.value)}
                        placeholder={`eg. "Excalibur", "Shield of Asuvux", "Invisible cloak", etc`}
                        className="bg-transparent w-full outline-none border-2 border-primary py-2 px-4 text-xl placeholder:text-lg font-semibold rounded-2xl text-secondary mb-6"/>


                    <label className="text-2xl text-left font-semibold text-primary block mb-4">Equipment description</label>
                    <textarea
                        value={characterEquipmentDescription}
                        spellCheck="false"
                        onChange={ev => setCharacterEquipmentDescription(ev.target.value)}
                        placeholder="Describe the equipment and what it does for the character"
                        className="bg-transparent w-full outline-none border-2 h-32 border-primary py-2 px-4 text-lg placeholder:text-lg font-semibold rounded-2xl text-secondary mb-2"/>

                    <button className="bg-primary w-full flex justify-center items-center gap-2 border-2 border-background rounded-full text-2xl font-bold px-4 py-1 transition-all duration-200 hover:bg-background hover:border-primary hover:text-primary mt-6" onClick={ev => {saveEquipment(ev); setAddEquipmentDisplay('hidden'); setAddEquipmentButtonDisplay('block')}}>
                        Save equipment
                    </button>

                </div>

                <button className={`bg-primary w-1/2 flex justify-center items-center gap-2 border-2 border-background rounded-full text-2xl font-bold px-4 py-2 transition-all duration-200 hover:bg-background hover:border-primary hover:text-primary mb-5 ${addEquipmentButtonDisplay}`} onClick={() => {setAddEquipmentDisplay('block'); setAddEquipmentButtonDisplay('hidden')}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-0.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add Equipment
                </button>

            </div>
        </div>
    );
}
 
export default EquipmentInput;