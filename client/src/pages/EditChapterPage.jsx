import { useNavigate, useParams } from "react-router-dom";
import SinglePageNav from "../partials/SinglePageNav";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import TextareaAutosize from 'react-textarea-autosize';

const EditChapterPage = () => {

    const { id, chapterIndex } = useParams();

    const navigate = useNavigate();

    const contentRef = useRef();

    const [chapter, setChapter] = useState({});

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const chapterNumberText = () => {
        if (chapter.chapterNumber < 10) {
            return `CH: 0${chapter.chapterNumber}`
        } else {
            return `CH: ${chapter.chapterNumber}`
        }
    };

    const saveChapter = async () => {
        const chapterData = { title, content };
        await axios.put(`/books/${id}/chapter/${chapterIndex}`, chapterData);
        navigate(`/books/${id}/chapters`);
    }

    useEffect(() => {
        axios.get(`/books/${id}/chapter/${chapterIndex}`)
            .then((res) => {
                setChapter(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (chapter.title) {
            setTitle(chapter.title);
        }
        if (chapter.content) {
            setContent(chapter.content);
        }
    }, [chapter]);

    return (
        <div className="flex flex-col items-center">
            <SinglePageNav/>
            <h1 className="text-primary text-5xl font-bold text-center mt-10">Edit Chapter</h1>
            <div className="flex flex-col mt-12 w-2/3">
                <label className="text-primary text-3xl font-bold mb-4">Title:</label>
                <input
                    type="text"
                    className="outline-none border-2 border-primary bg-background rounded-xl flex-grow py-4 px-6 text-3xl font-semibold text-primary"
                    placeholder={title}
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                    onKeyDown={ev => {
                        if (ev.key === 'Enter') {
                            ev.preventDefault();
                            contentRef.current.focus();
                        }
                    }}
                />

                <label className="text-primary text-3xl font-bold mb-4 mt-10">{chapterNumberText()}</label>
                <TextareaAutosize
                    ref={contentRef}
                    className="flex-grow border-2 border-primary outline-none rounded-xl bg-background text-primary text-xl font-semibold pt-6 pb-10 px-16 w-full resize-none overflow-hidden"
                    value={content}
                    onChange={ev => setContent(ev.target.value)}
                />

                <div className="w-full flex justify-center">
                    <button className="text-background py-2 mt-10 text-2xl font-bold bg-primary border-2 border-primary rounded-full w-5/6 transition-all duration-200 mb-24 hover:bg-background hover:text-primary" onClick={() => saveChapter()}>Save chapter</button>
                </div>
            </div>
        </div>
    );
}
 
export default EditChapterPage;