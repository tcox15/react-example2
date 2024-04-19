import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import SinglePageNav from '../partials/SinglePageNav';
import axios from 'axios';

const NewOutlinePage = () => {

    const { id } = useParams();

    const contentRef = useRef();

    const navigate = useNavigate();

    const [forChapterNumber, setForChapterNumber] = useState(0);
    const [content, setcontent] = useState('');

    const [inputForChapterNumber, setInputForChapterNumber] = useState('');

    const checkOutlineNumber = async () => {
        const res = await axios.get(`/books/${id}/outlines/checkOutlineNumber/${forChapterNumber}`);
        if (res.data === true) {
            saveOutline();
        } else {
            alert('Outline for this chapter already exists');
        }
    };

    const saveOutline = async () => {

        const outlineData = { forChapterNumber, content };

        try {
            await axios.put(`/books/${id}/outlines/new`, outlineData);
            navigate(`/books/${id}/outlines`);
            setInputForChapterNumber('');
            setcontent('');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="w-full flex flex-col items-center mb-24">
            <SinglePageNav />
            <div className="w-5/6 flex flex-col items-center">
                <div className="flex flex-col items-center mt-14 w-5/6">
                    <h2 className="text-primary text-5xl font-bold ">New outline</h2>
                    <input type="text" autoFocus className="flex flex-col text-xl items-center mt-10 bg-background text-primary font-semibold border-2 border-primary mb-10 w-full outline-none p-6 rounded-2xl"
                    placeholder="For chapter number:"
                    value={inputForChapterNumber}
                    onChange={ev => {
                            if (!isNaN(ev.target.value)) {
                                setInputForChapterNumber(ev.target.value);
                                setForChapterNumber(Number(ev.target.value))
                            } else {
                                return null;
                            }
                        }}
                        onKeyDown={ev => {
                            if (ev.key === 'Enter') {
                                ev.preventDefault();
                                contentRef.current.focus();
                            }
                        }}
                    />
                    <TextareaAutosize
                        ref={contentRef}
                        className='flex flex-col text-xl items-center mt-6 bg-background text-primary font-semibold border-2 border-primary mb-10 w-full min-h-40 outline-none p-10 rounded-2xl'
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
                        checkOutlineNumber();
                    }}>
                        Save outline
                </button>
            </div>
        </div>
    );
}
 
export default NewOutlinePage;