import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IdeasPage = () => {

    const [ideasDoc, setIdeasDoc] = useState([]);

    const deleteIdea = async (ideaIndex) => {
        const res  = await axios.delete(`/ideas/delete/${ideaIndex}`);
        setIdeasDoc(res.data);
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('/ideas');
            setIdeasDoc(res.data);
        }
        fetchData();
    }, [])

    return (
        <div className="flex flex-col items-center pb-24">
            <h1 className="text-primary text-5xl font-bold">Ideas page</h1>
            <div className="w-2/3 border-2 border-primary rounded-2xl mt-10 flex flex-col items-center p-10">
                <Link to={`/ideas/new`} className="w-1/2 text-center bg-primary border-2 border-primary text-background font-bold p-1 text-2xl rounded-full transition-all duration-200 hover:bg-background hover:text-primary">New idea</Link>
                {ideasDoc.ideas && ideasDoc.ideas.map((idea, index) => (
                    <div key={index} className="text-background bg-primary w-5/6 flex items-center relative rounded-full border-2 border-primary justify-center mt-6 p-2 text-2xl font-bold transition-all duration-200 hover:bg-background hover:text-primary">
                        <Link to={`/ideas/edit/${index}`} className="">{`Idea: ${idea.title}`}</Link>
                        <button className="absolute right-4 transition-all duration-200 hover:bg-primary hover:text-background border-2 border-primary rounded-full p-1" onClick={() => deleteIdea(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default IdeasPage;