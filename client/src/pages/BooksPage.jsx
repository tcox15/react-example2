import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const BooksPage = ({newBook, setNewBook}) => {

    const [books, setBooks] = useState([]);

    const navigate = useNavigate();

    const deleteBook = (id) => {
        axios.delete('/books/' + id)
            .then(() => {
                refreshBooks();
            })
    };

    const setPage = (book) => {
        if (newBook === false) {
            navigate('/books/' + book._id + '/edit');
            setNewBook(false);
        } else {
            setNewBook(true);
        }
    };

    const refreshBooks = () => {
        axios.get('/user-books').then(({data}) => {
            setBooks(data);
        });
    };

    useEffect(() => {
        refreshBooks();
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <div className="mx-14 my-6 grid grid-cols-4 gap-10">
                    {books.length > 0 && books.map((book, index) => (
                        <div key={index} className="bookContainer">
                            <div className="newBookButton border-2 border-primary rounded-3xl flex justify-center items-center text-primary text-2xl font-bold h-full" key={index}>
                            <Link className="flex h-full flex-col justify-center items-center w-full" to={'/books/' + book._id + '/edit'} onClick={() => {setPage(book); setNewBook(false)}}>
                                <div className="flex flex-col items-center">
                                    <span className="mb-2">{book.title}</span>
                                    <span className="font-normal">{book.genre}</span>
                                </div>
                            </Link>
                            <div className="absolute top-5 right-5 cursor-pointer" onClick={() => deleteBook(book._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                            </div>
                        </div>
                        </div>
                    ))}
                <Link to={'/books/new'} onClick={() => {setNewBook(true)}} className="bookContainer">
                    <button className="newBookButton flex justify-center items-center gap-2 w-full h-80 text-left text-3xl font-bold text-primary border-2 border-primary rounded-3xl transition-all duration-300 active:bg-secondary active:scale-98">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        Add book
                    </button>
                </Link>
            </div>
        </div>
    );
}
 
export default BooksPage;