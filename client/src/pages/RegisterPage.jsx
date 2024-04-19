import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const registerUser = async (ev) => {
        ev.preventDefault();
        try {
            await axios.post('/register', {
            firstName,
            lastName,
            email,
            password
        });
        navigate('/login');
        } catch (e) {
            alert('Registration failed...');
            setEmail('');
            setPassword('');
            console.log(e);
        }

    };


    return (
        <div className="grow flex flex-col items-center">
            <div className="">
                <form className="max-w-md py-8 mt-6 text-center bg-darkBackground text-2xl text-secondary shadow-md rounded-3xl" onSubmit={registerUser}>
                    <h1 className="text-3xl mb-6 font-bold cursor-default text-center">Register</h1>
                    <input type="text"
                    autoComplete="off"
                    autoCorrect="off"
                    required
                    value={firstName}
                    onChange={ev => setFirstName(ev.target.value)}
                    placeholder="First name"
                    className="w-2/3 py-2 bg-darkBackground outline-none placeholder:font-thin"/>
                    <input type="text"
                    autoComplete="off"
                    autoCorrect="off"
                    required
                    value={lastName}
                    onChange={ev => setLastName(ev.target.value)}
                    placeholder="Last name"
                    className="w-2/3 py-2 mt-4 bg-darkBackground outline-none placeholder:font-thin"/>
                    <input type="email"
                    autoComplete="off"
                    autoCorrect="off"
                    required
                    value={email}
                    onChange={ev => setEmail(ev.target.value)}
                    placeholder="email@gmail.com"
                    className="w-2/3 py-2 mt-4 bg-darkBackground outline-none placeholder:font-thin"/>
                    <input type="password"
                    autoComplete="off"
                    autoCorrect="off"
                    required
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}
                    placeholder="password"
                    className="w-2/3 py-2 mt-4 bg-darkBackground outline-none placeholder:font-thin"/>
                    <button className="w-5/6 text-background bg-secondary border-2 border-secondary text-lg mt-6 px-4 py-1 rounded-lg transition-all duration-200 hover:bg-darkBackground hover:text-secondary active:bg-gray-500 active:border-gray-500">Register</button>
                    <div className="text-lg cursor-default mt-3 text-primary">Already have an account? <Link to={'/login'} className="text-secondary transition-all duration-200 hover:text-white">Login</Link></div>
                </form>
            </div>
        </div>
    );
}
 
export default RegisterPage;