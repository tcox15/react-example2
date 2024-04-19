import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

const UserContextProvider = ({children}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user) {
            axios.get('/profile')
                .then(({data}) => {
                    setUser(data);
                })
                .catch(err => console.log(err));
        }
    }, [])
    return ( 
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}
 
export default UserContextProvider;