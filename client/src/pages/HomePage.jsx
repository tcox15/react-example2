import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const HomePage = () => {

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('/all-books').then(async ({data}) => {
            setBooks(data);
        });
    }, []);

    const setPage = (bookId) => {
        navigate(`/books/${bookId}/edit `);
    }

    return (
        <div>
            <h1 className="text-primary font-bold text-4xl text-center">Books</h1>
            <div className="grid grid-cols-4 mt-10 gap-10 px-24">
                {books.length > 0 && books.map((book, index) => (
                <div key={index} className="relative bookContainer">
                    <div className="newBookButton border-2 border-primary rounded-3xl justify-center items-center text-primary text-2xl font-bold h-64">
                        <Link className="flex h-full flex-col justify-center items-center" to={'/'}>
                            <div className="flex flex-col items-center">
                                <span className="mb-2">{book.title}</span>
                                <span className="font-normal mt-2">By: {book.author.firstName} {book.author.lastName}</span>
                            </div>
                        </Link>
                    </div>
                    {user && user._id === book.author._id && (
                        <button className="editButton px-3 rounded-full bg-background border-2 border-primary font-semibold text-primary absolute text-xl top-3 right-3 opacity-0" onClick={() => {setPage(book._id)}}>
                            Edit
                        </button>
                    )}
                </div>
            ))}
            </div>
        </div>
    );
}
export default HomePage;