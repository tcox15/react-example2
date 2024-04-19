import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const createIdeaModel = async () => {
        await axios.post('/ideas');
    }

    const handleLoginSubmit = async (ev) => {
        ev.preventDefault();
        try {
            const { data } = await axios.post('/login', {
                email,
                password
            });
            await setUser(data);
            await createIdeaModel();
            navigate('/');

        } catch (e) {
            alert('Login not successful');
            console.log(e);
        }
    };

    return (
        <div className="grow flex flex-col items-center">
            <div className="">
                <form className="max-w-md py-8 mt-20 text-center bg-darkBackground text-2xl text-secondary shadow-md rounded-3xl"
                onSubmit={handleLoginSubmit}>
                    <h1 className="text-3xl mb-6 font-bold cursor-default text-center">Login</h1>
                    <input type="email"
                    autoComplete="off"
                    autoCorrect="off"
                    required
                    value={email}
                    onChange={ev => setEmail(ev.target.value)}
                    placeholder="email@gmail.com"
                    className="w-2/3 py-2 bg-darkBackground outline-none placeholder:font-thin"/>
                    <input type="password"
                    autoComplete="off"
                    autoCorrect="off"
                    required
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}
                    placeholder="password"
                    className="w-2/3 py-2 mt-4 bg-darkBackground outline-none placeholder:font-thin"/>
                    <button className="w-5/6 text-background bg-secondary border-2 border-secondary text-lg mt-6 px-4 py-1 rounded-lg transition-all duration-200 hover:bg-darkBackground hover:text-secondary active:bg-gray-500 active:border-gray-500">Login</button>
                    <div className="text-lg cursor-default mt-3 text-primary">Don't have an account? <Link to={'/register'} className="text-secondary transition-all duration-200 hover:text-white">Register</Link></div>
                </form>
            </div>
        </div>
    );
}
 
export default LoginPage;