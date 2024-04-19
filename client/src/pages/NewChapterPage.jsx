import { useEffect, useRef, useState } from "react";
import SinglePageNav from "../partials/SinglePageNav";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TextareaAutosize from 'react-textarea-autosize';

const NewChapterPage = ({ chapters, setChapters }) => {

    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [chapterNumber, setChapterNumber] = useState(0);

    const contentRef = useRef();
    const navigate = useNavigate();

    const chapterNumberText = () => {
        if (chapterNumber < 10) {
            return `CH: 0${chapterNumber}`
        } else {
            return `CH: ${chapterNumber}`
        }
    };

    const saveChapter = async () => {
        try {
            const chapterData = { title, content, chapterNumber };
            await axios.put(`/books/${id}/chapters/new`, chapterData);
            navigate(`/books/${id}/chapters`);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        axios.get(`/books/${id}/chapters/chapterCount`)
            .then((res) => {
                let chapterCount = res.data;
                setChapterNumber(chapterCount);
            })
            .catch(err => console.log(err))
    }, [id]);


    return (
        <div className="flex flex-col items-center">
            <SinglePageNav/>
            <h1 className="text-primary text-5xl font-bold mt-10">New Chapter</h1>
            <div className="flex flex-col mt-12 mb-24 w-3/4">
                <input
                    autoFocus
                    type="text"
                    className="outline-none border-2 border-primary bg-background rounded-xl flex-grow py-4 px-16 text-3xl font-semibold text-primary"
                    placeholder="Chapter title"
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
                    className="flex-grow border-2 border-primary outline-none rounded-xl bg-background text-primary text-2xl font-semibold pt-10 pb-10 px-16 min-h-40 w-full overflow-hidden resize-none"
                    placeholder="chapter content"
                    value={content}
                    onChange={ev => setContent(ev.target.value)}
                    onKeyDown={ev => {
                        if (ev.key === 'Tab') {
                            ev.preventDefault();
                        }
                    }}
                />

                <div className="w-full flex justify-center">
                    <button className="text-background py-2 mt-10 text-2xl font-bold bg-primary border-2 border-primary rounded-full w-5/6 transition-all duration-200 mb-24 hover:bg-background hover:text-primary" onClick={() => {
                        saveChapter()
                    }}>Save chapter</button>
                </div>
            </div>
        </div>
    );
}
 
export default NewChapterPage;
