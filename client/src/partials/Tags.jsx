import { useEffect, useState } from "react";

export default function Tags({selected, onChange}) {

    const [isChecked, setIsChecked] = useState(false);
    const [dynamicClass, setDynamicClass] = useState('');

    const handleCheckBoxClick = (ev) => {
        const { checked, name } = ev.target;
        if (checked) {
            onChange([...selected, name].filter(perk => perk !== ""));
        } else {
            onChange([...selected.filter(selectedName => selectedName !== name)]);
        }
    }

    useEffect(() => {
        if (isChecked === true) {
            setDynamicClass('bg-background border-2 border-primary');
        }
    }, [])

    return (
        <div className="grid gap-2 grid-cols-3 mb-10">
            <label className="tags">
                <input type="checkbox" className="tagsCheck" name="action" onChange={ev => handleCheckBoxClick(ev)} checked={selected.includes("action")}/>
                <span className="customCheckbox"></span>
                <img src='/punch.png' className="w-8"/>
                <span className="font-semibold text-xs">Action</span>
            </label>
            <label className="tags">
                <input type="checkbox" className="tagsCheck" name="romance" onChange={ev => handleCheckBoxClick(ev)} checked={selected.includes("romance")}/>
                <span className="customCheckbox"></span>
                <img src='/lips.png' className="w-8"/>
                <span className="font-semibold text-xs">Romance</span>
            </label>
            <label className="tags">
                <input type="checkbox" className="tagsCheck" name="adventure" onChange={ev => handleCheckBoxClick(ev)} checked={selected.includes("adventure")}/>
                <span className="customCheckbox"></span>
                <img src='/sword.png' className="w-8"/>
                <span className="font-semibold text-xs">Adventure</span>
            </label>
            <label className="tags">
                <input type="checkbox" className="tagsCheck" name="r18" onChange={ev => handleCheckBoxClick(ev)} checked={selected.includes("r18")}/>
                <span className="customCheckbox"></span>
                <img src='/18plus.png' className="w-8"/>
                <span className="font-semibold text-xs">R-18</span>
            </label>
            <label className="tags">
                <input type="checkbox" className="tagsCheck" name="magic" onChange={ev => handleCheckBoxClick(ev)} checked={selected.includes("magic")}/>
                <span className="customCheckbox"></span>
                <img src='/magic-wand.png' className="w-8"/>
                <span className="font-semibold text-xs">Magic</span>
            </label>
            <label className="tags">
                <input type="checkbox" className="tagsCheck" name="overpowered" onChange={ev => handleCheckBoxClick(ev)} checked={selected.includes("overpowered")}/>
                <span className="customCheckbox"></span>
                <img src='/person.png' className="w-8"/>
                <span className="font-semibold text-xs">Overpowered</span>
            </label>
            <label className="tags">
                <input type="checkbox" className="tagsCheck" name="sci-fi" onChange={ev => handleCheckBoxClick(ev)} checked={selected.includes("sci-fi")}/>
                <span className="customCheckbox"></span>
                <img src='/city.png' className="w-8"/>
                <span className="font-semibold text-xs">Sci-Fi</span>
            </label>
            <label className="tags">
                <input type="checkbox" className="tagsCheck" name="villain" onChange={ev => handleCheckBoxClick(ev)} checked={selected.includes("villain")}/>
                <span className="customCheckbox"></span>
                <img src='/villain.png' className="w-8"/>
                <span className="font-semibold text-xs">Villain</span>
            </label>
            <label className="tags">
                <input type="checkbox" className="tagsCheck" name="reincarnation" onChange={ev => handleCheckBoxClick(ev)} checked={selected.includes("reincarnation")}/>
                <span className="customCheckbox"></span>
                <img src='/public/recycle.png' className="w-8"/>
                <span className="font-semibold text-xs">Reincarnation</span>
            </label>
        </div>
    );
}