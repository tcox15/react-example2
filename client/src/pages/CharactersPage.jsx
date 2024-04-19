import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SinglePageNav from "../partials/SinglePageNav";

const CharactersPage = ({characters = [], setCharacters}) => {

    const { id } = useParams();
    const [deletedCharacter, setDeletedCharacter] = useState(false);

    const deleteCharacter = async (characterId) => {
        try {
            await axios.delete(`/books/${id}/character/${characterId}`);
            setDeletedCharacter(true);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        axios.get(id + '/characters/')
            .then((response) => {
                const charactersData = response.data;
                setCharacters(charactersData);
                setDeletedCharacter(false);
            })
            .catch(err => console.log(err));
    }, [characters, deletedCharacter]);

    return (
        <div className="flex flex-col mx-14 items-center">
            <SinglePageNav/>
            <h1 className="text-center text-primary text-5xl mt-10 font-bold">Characters</h1>
            <div className="grid grid-cols-4 gap-10 mt-10">
                {characters && characters.map((character, index) => (
                    <div className="bookContainer" key={index}>
                        <div className="newBookButton border-2 border-primary rounded-3xl flex justify-center items-center text-primary text-2xl font-bold w-64 h-64">
                        <Link to={'/books/' + id + '/characters/' + character._id} className="h-full w-full flex items-center justify-center">
                            <h2 className="text-2xl font-bold">{character.name}</h2>
                        </Link>
                        <button className="absolute top-3 right-3 bg-primary text-background p-1 rounded-full transition-all duration-200 hover:text-primary hover:bg-background" onClick={() => deleteCharacter(character._id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    </div>
                    </div>
                ))}
                <div className="bookContainer">
                    <Link to={'/books/' + id + '/characters/new'} className="newBookButton border-2 border-primary rounded-3xl flex justify-center items-center text-primary text-2xl font-bold w-64 h-64">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add Character
                    </Link>
                </div>
            </div>
        </div>
    );
}
 
export default CharactersPage;