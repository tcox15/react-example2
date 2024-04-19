import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";

const Header = () => {

    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const logout = async () => {
        await axios.post('/logout');
        navigate('/');
        setUser(null);
    };
    
    return (
        <div className="border-b-2 border-primary mb-8">
            <header className='flex items-center justify-between px-8 py-6 bg-background text-primary font-poppins'>
                <Link to={'/'} className='font-semibold mr-auto text-3xl cursor-pointer transition-all duration-200 hover:text-secondary'>Book Creator</Link>
                <ul className='navLinkCollection flex justify-between text-xl font-thin'>
                    <Link to={user ? '/books' : '/login'} className='navLink mr-10 cursor-pointer transition-all duration-200 hover:text-secondary'>User books</Link>
                    <Link to={user ? '/ideas' : '/login'} className="navLink mr-10 cursor-pointer transition-all duration-200 hover:text-secondary">Book Ideas</Link>
                    <li className='navLink cursor-pointer transition-all duration-200 hover:text-secondary'>About</li>
                </ul>
                <Link to={user ? '/books' : 'login'} className='bg-primary p-1 rounded-full cursor-pointer transition-all duration-200 hover:scale-95 hover:bg-secondary flex items-center gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-background">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                    </svg>
                    
                        {user && (
                            <p className="mr-2 text-background text-xl font-semibold">
                                {`${user.firstName} ${user.lastName}`}
                            </p>
                        )}
                </Link>
                {user && (
                    <button className="py-1.5 px-3 ml-3 rounded-full bg-primary text-background text-lg font-semibold transition-all duration-200 hover:scale-95 hover:bg-secondary" onClick={logout}>Logout</button>
                )}
            </header>
        </div>
    );
}
 
export default Header;