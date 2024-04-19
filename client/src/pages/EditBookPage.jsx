import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Tags from "../partials/Tags";
import SinglePageNav from '../partials/SinglePageNav';
import TextareaAutosize from "react-textarea-autosize";

const EditBookPage = ({chapters, setChapters, characters, setCharacters}) => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [tags, setTags] = useState(['']);

    useEffect(() => {
        if (id) {
            axios.get('/books/' + id)
                .then((response) => {
                    const { data } = response;
                    setTitle(data.title);
                    setGenre(data.genre);
                    setSynopsis(data.synopsis);
                    setTags(data.tags);
                })
        }
    }, [id]);

    const saveBook = (ev) => {
        ev.preventDefault();

        const bookData = {id, title, genre, synopsis, tags, chapters, characters};

        axios.put('/books', bookData)
            .then(() => {
                refreshBook();
                navigate('/books');
            });
    };

    const refreshBook = () => {
        setTitle(title);
        setGenre(genre);
        setSynopsis(synopsis);
        setTags(tags);
    }

    useEffect(() => {
        refreshBook();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <SinglePageNav/>
            <h1 className="text-center text-primary text-5xl mt-14 font-bold">Edit Book</h1>
            <div className="w-full flex flex-col mb-32 mx-32 mt-6 items-center">
                <form className="flex flex-col ml-10 w-2/3" onSubmit={saveBook}>
                    <div className="flex flex-col">
                        <div className="flex flex-col">
                            <label className="text-3xl text-primary font-bold mb-4">Edit title:</label>
                            <input
                                type="text"
                                spellCheck="false"
                                placeholder={title}
                                className="text-secondary font-bold text-3xl mb-12 bg-transparent outline-none border-2 border-primary px-6 py-2 rounded-2xl"
                                onChange={ev => setTitle(ev.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-3xl text-primary font-bold mb-4">Edit genre:</label>
                            <input
                            type="text"
                            spellCheck="false"
                            placeholder={genre}
                            className="text-secondary w-full font-bold text-3xl mb-12 bg-transparent outline-none border-2 border-primary px-6 py-2 rounded-2xl"
                            onChange={ev => setGenre(ev.target.value)}
                        />
                        </div>

                        
                        <label className="text-3xl text-primary font-bold mb-4">Edit synopsis:</label>
                        
                        <TextareaAutosize
                            placeholder={synopsis}
                            onChange={ev => setSynopsis(ev.target.value)}
                            className="bg-transparent resize-none border border-primary px-6 py-4 text-lg rounded-2xl min-h-44 text-secondary outline-none mb-10"
                        />

                        <label className="text-3xl text-primary font-bold mb-6">Tags:</label>

                        <Tags selected={tags} onChange={setTags}/>

                        <button className="text-3xl bg-primary border-2 border-background px-6 py-2 rounded-full transition-all duration-200 hover:bg-background hover:text-primary hover:border-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default EditBookPage;