import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";

const NewIdeaPage = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const navigate = useNavigate();

    const capFirst = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const saveIdea = async () => {
        const ideaData = { title, content };
        try {
            await axios.put(`/ideas/new`, ideaData);
            navigate('/ideas');
        } catch (err) {console.log(err)}
    };


    return (
        <div className="flex flex-col items-center mb-24">
            <h1 className="text-5xl text-primary font-bold">New Book Idea</h1>
            <div className="w-2/3 border-2 border-primary rounded-2xl p-10 flex flex-col mt-10">
                <label className="text-3xl font-bold text-primary">Title:</label>
                
                <input
                    type="text"
                    className="outline-none bg-background border-2 border-primary rounded-2xl mt-6 text-primary font-semibold text-xl p-6"
                    autoFocus
                    placeholder="name for idea"
                    value={title}
                    onChange={ev => setTitle(capFirst(ev.target.value))}
                />
                
                <label className="text-3xl font-bold text-primary mt-10">Idea:</label>
                
                <TextareaAutosize
                    type="text"
                    className="outline-none bg-background border-2 border-primary rounded-2xl mt-6 text-primary font-semibold text-xl p-6 overflow-hidden resize-none"
                    autoFocus
                    placeholder="what is your idea?"
                    value={content}
                    onChange={ev => setContent(capFirst(ev.target.value))}
                />
                
                <button className="w-5/6 text-center self-center mt-10 bg-primary border-2 border-primary text-background font-bold p-2 text-2xl rounded-full transition-all duration-200 hover:bg-background hover:text-primary" onClick={() => saveIdea()}>Save idea</button>
            </div>
        </div>
    );
}
 
export default NewIdeaPage;