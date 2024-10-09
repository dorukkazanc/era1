import {createContext, useContext, useEffect, useState} from "react";
import config from "../config";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const user = sessionStorage.getItem('loggedInUser');

        if (user) {
            setLoggedInUser(JSON.parse(user));
        }
    }, []);

    const login = async (email, password) => {
        console.log("request at")
        const response = await fetch(config.BACKEND_URL + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });

        const data = await response.json();

        if (data.success) {
            sessionStorage.setItem('loggedInUser', JSON.stringify(data.data));
            window.location.href = '/';
        } else {
            alert(data.message);
        }
    };

    const logout = () => {
        sessionStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
    };

    return (
        <AuthContext.Provider value={{
            loggedInUser,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    return useContext(AuthContext);
}

export {AuthProvider, useAuth};