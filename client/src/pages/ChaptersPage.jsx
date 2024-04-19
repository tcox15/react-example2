import { Link, useParams } from "react-router-dom";
import SinglePageNav from "../partials/SinglePageNav";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const ChaptersPage = ({ chapters, setChapters }) => {
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const chaptersPerPage = 12;

    const chapterNumberText = (chapterNumber) => {
        if (chapterNumber < 10) {
            return `0${chapterNumber}`
        } else {
            return `${chapterNumber}`
        }
    };

    const deleteChapter = async (chapterIndex) => {
        const res = await axios.delete(`/books/${id}/chapter/${chapterIndex}`);
        setChapters(res.data);
    };

    // Logic for displaying chapters
    const indexOfLastChapter = currentPage * chaptersPerPage;
    const indexOfFirstChapter = indexOfLastChapter - chaptersPerPage;
    const currentChapters = chapters.slice(indexOfFirstChapter, indexOfLastChapter);

    const [isReversed, setIsReversed] = useState(false);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(chapters.length / chaptersPerPage); i++) {
        pageNumbers.push(i);
    };

    const toggleOrder = useCallback(() => {
        setIsReversed(preIsReversed => !preIsReversed);
    }, []);

    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <li
                key={number}
                id={number}
                onClick={() => setCurrentPage(number)}
                className="cursor-pointer inline mr-2 border-2 border-primary rounded-full px-2 font-bold text-xl"
            >
                {number}
            </li>
        );
    });

    useEffect(() => {
        axios.get(`/books/${id}/chapters`)
            .then((res) => {
                const data = isReversed ? res.data.reverse() : res.data;
                setChapters(data);
            })
            .catch(err => console.log(err));
    }, [id, isReversed]);

    useEffect(() => {
        setChapters([...chapters].sort((a, b) => a.chapterNumber - b.chapterNumber));
    }, []);

    return (
        <div className="flex flex-col items-center">
            <SinglePageNav/>
            <div className="flex flex-col w-2/3 items-center mt-8 mb-32">
                <h1 className="text-primary text-5xl font-bold text-center mt-4 mb-10">Chapters</h1>
                <div className="flex flex-col items-center relative w-full border-2 border-primary p-4 rounded-2xl">
                    <Link to={`/books/${id}/chapters/new`} className="flex justify-center items-center gap-2 bg-primary text-back text-2xl font-bold my-6 w-1/2 rounded-full px-4 py-2 text-center transition-all duration-200 border-primary border-2 hover:bg-background hover:text-primary">
                        New chapter
                    </Link>
                    <button className="absolute top-3 right-3 text-primary flex gap-4 text-2xl" onClick={() => toggleOrder()}>
                        {isReversed ? 'Descending' : 'Ascending'}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                        </svg>
                    </button>
                    <div className="flex flex-col items-center w-full px-8 mt-5">
                        {currentChapters.map((chapter, index) => (
                            <div key={index} className="w-5/6 flex rounded-2xl px-4 py-2 bg-primary mb-6 transition-all duration-200 border-primary border-2 hover:bg-background hover:text-primary">
                                <Link to={`/books/${id}/chapters/${index}`} className="text-2xl flex-grow font-bold">
                                {`${chapterNumberText(chapter.chapterNumber)}: ${chapter.title}`}
                                </Link>
                                <button className="float-right transition-all duration-200 hover:bg-primary hover:text-background p-1 rounded-full" onClick={() => deleteChapter(index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                    <ul id="page-numbers" className="text-primary mb-8 text-center">
                        {renderPageNumbers}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ChaptersPage;