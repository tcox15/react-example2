import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";

const EditIdeaPage = () => {

    const { ideaIndex } = useParams();

    const navigate = useNavigate();

    const [idea, setIdea] = useState({});

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const saveIdea = async () => {
        const editedIdea = { title, content };
        const res = await axios.put(`/ideas/save/${ideaIndex}`, editedIdea);
        navigate('/ideas');
    };

    const capFirst = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`/ideas/${ideaIndex}`);
            setIdea(res.data);
        }
        fetchData();
    }, [ideaIndex]);

    useEffect(() => {
        if (idea.title) {
            setTitle(idea.title);
        }
        if (idea.content) {
            setContent(idea.content);
        }
    }, [idea]);

    
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-primary text-5xl font-bold">Edit Idea</h1>
            <div className="w-2/3 border-2 border-primary rounded-2xl p-10 flex flex-col mt-10">
                <label className="text-3xl font-bold text-primary">Name:</label>
                
                <input
                    type="text"
                    className="outline-none bg-background border-2 border-primary rounded-2xl mt-6 text-primary font-semibold text-xl p-6"
                    autoFocus
                    placeholder="new idea name"
                    value={title}
                    onChange={ev => setTitle(capFirst(ev.target.value))}
                />
                
                <label className="text-3xl font-bold text-primary mt-10">Idea:</label>
                
                <TextareaAutosize
                    type="text"
                    className="outline-none overflow-hidden resize-none bg-background border-2 border-primary rounded-2xl mt-6 text-primary font-semibold text-xl p-6"
                    placeholder="what is your idea?"
                    value={content}
                    onChange={ev => setContent(capFirst(ev.target.value))}
                />
                
                <button className="w-5/6 text-center self-center mt-10 bg-primary border-2 border-primary text-background font-bold p-2 text-2xl rounded-full transition-all duration-200 hover:bg-background hover:text-primary" onClick={() => saveIdea()}>Save idea</button>
            </div>
        </div>
    );
}
 
export default EditIdeaPage;