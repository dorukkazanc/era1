import {createContext, useContext, useEffect, useState} from "react";
import config from "../config";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const user = sessionStorage.getItem('loggedInUser');
        console.log("girdii")
        if (user) {
            setLoggedInUser(JSON.parse(user));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(config.BACKEND_URL + '/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });
            const responseJson = await response.json();

            if (responseJson.success) {
                sessionStorage.setItem('loggedInUser', JSON.stringify(responseJson.data));
                setLoggedInUser(responseJson.data);
                return true
            } else {
                alert(responseJson.message);
                return false
            }
        } catch (e) {
            console.error(e);
            return false
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