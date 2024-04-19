import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import SinglePageNav from '../partials/SinglePageNav';
import axios from 'axios';

const EditOutlinePage = () => {

    const { id, outlineIndex } = useParams();

    const [outline, setOutline] = useState({});

    const contentRef = useRef();

    const navigate = useNavigate();

    const [forChapterNumber, setForChapterNumber] = useState(0);
    const [content, setcontent] = useState('');

    const saveEditedOutline = async () => {

        const outlineData = { content };

        try {
            await axios.put(`/books/${id}/outlines/${outlineIndex}`, outlineData);
            navigate(`/books/${id}/outlines`);
            setcontent('');
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/books/${id}/outlines/${outlineIndex}`);
                setOutline(res.data);
            } catch (err) {console.log(err)}
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (outline.forChapterNumber) {
            setForChapterNumber(outline.forChapterNumber);
        }
        if (outline.content) {
            setcontent(outline.content);
        }
    }, [outline]);

    return (
        <div className="w-full flex flex-col items-center mb-24">
            <SinglePageNav />
            <div className="w-5/6 flex flex-col items-center">
                <div className="flex flex-col items-center mt-14 w-2/3">
                    <h2 className="text-primary text-5xl font-bold ">Edit outline</h2>
                    <div className="text-2xl font-bold mt-10 bg-background text-primary border-2 border-primary mb-10 w-full outline-none p-6 rounded-2xl">{`Outline for CH ${forChapterNumber}`}</div>
                    <TextareaAutosize
                        ref={contentRef}
                        className='flex flex-col text-xl items-center mt-6 bg-background text-primary font-semibold border-2 border-primary mb-10 w-full outline-none p-10 rounded-2xl'
                        placeholder='Outline content'
                        onKeyDown={ev => {
                            if (ev.key === 'Tab') {
                                ev.preventDefault();
                            }
                        }}
                        value={content}
                        onChange={ev => setcontent(ev.target.value)}
                    />
                </div>
                <button className="flex justify-center items-center gap-2 bg-primary text-back text-2xl font-bold my-6 w-1/2 rounded-full px-4 py-2 text-center transition-all duration-200 border-primary border-2 hover:bg-background hover:text-primary" onClick={() => {
                        saveEditedOutline();
                    }}>
                        Save outline
                </button>
            </div>
        </div>
    );
}
 
export default EditOutlinePage;