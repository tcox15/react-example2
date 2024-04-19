import axios from "axios";
import { useEffect, useState } from "react";
import Tags from "../partials/Tags";
import { useNavigate, useParams } from "react-router-dom";
import ReactTextareaAutosize from "react-textarea-autosize";

const NewBookPage = () => {

    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [tags, setTags] = useState(['']);

    const navigate = useNavigate();


    const saveBook = async (ev) => {
        ev.preventDefault();
        const bookData = {
            title, genre, synopsis, tags
        };
        await axios.post('/books', bookData);
        navigate('/books');
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    


    return (
        <div>
            <form className="w-full flex flex-col items-center" onSubmit={saveBook}>
                <h1 className="text-secondary font-bold text-3xl mb-12">Create new book</h1>

                <input type="text"
                autoComplete="off"
                spellCheck="false"
                autoCorrect="off"
                required
                value={title}
                onChange={ev => setTitle(ev.target.value)}
                placeholder="Title"
                className="bg-background outline-none text-secondary text-2xl border-2 border-primary px-10 py-2 w-2/5 rounded-full"/>

                <input type="text"
                placeholder="Genre"
                autoComplete="off"
                spellCheck="false"
                autoCorrect="off"
                required
                value={genre}
                onChange={ev => setGenre(ev.target.value)}
                className="bg-background outline-none text-secondary text-2xl border-2 border-primary px-10 py-2 w-2/5 rounded-full mt-6"/>

                <ReactTextareaAutosize className="overflow-hidden resize-none w-2/5 h-40 min-h-24 mt-6 bg-transparent outline-none border-2 border-primary rounded-2xl px-10 text-lg text-secondary py-3"
                placeholder="Synopsis"
                value={synopsis}
                onChange={ev => setSynopsis(ev.target.value)}/>
                
                <div className="mt-6 w-2/5">
                    <h2 className="text-primary text-2xl mb-4">Tags</h2>
                    <Tags selected={tags} onChange={setTags} />
                </div>

                <button className="mb-16 w-2/5 border-2 border-primary text-primary rounded-full py-2 text-2xl transition-all duration-200 hover:bg-primary hover:text-background">Create</button>


            </form>
        </div>
    );
}
 
export default NewBookPage;