import {createContext, useContext, useMemo, useState} from "react";
import Axios from "axios";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [authError, setAuthError] = useState(null);
    const [registrationCompleted, setRegistrationCompleted]=useState(true)

    const resetAuthError = () => {
        setAuthError(null);
    };

    // call this function when you want to authenticate the user
    const login = async (credentials) => {

        await Axios.post("http://localhost:8085/login", JSON.stringify(credentials), {withCredentials: true}).then(() => {
            setAuthenticated(true)
            setAuthError(null)
        }).then(() => {
            Axios.post("http://localhost:8085/me", undefined, {withCredentials: true}).then(
                (response) => {
                    setRegistrationCompleted(response.data["completed"])
                })
        }).catch((error)=>{
            if (error.response) {
                if (error.response.status === 401) {
                    setAuthError("Wrong email address or password");
                } else {
                    setAuthError("Something went wrong, please try again");
                }
            } else {
                setAuthError("Something went wrong, please try again");
            }
            setAuthenticated(false);
            throw error; // Propagate the error
        })
    }

    // call this function to sign out logged in user
    const logout = () => {
        Axios.post("http://localhost:8085/logout", undefined,{withCredentials: true})
            .then(() => {
                setAuthenticated(false);
                setRegistrationCompleted(true)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const value = useMemo(() => ({
        authenticated,
        login,
        logout,
        authError,
        resetAuthError,
        registrationCompleted,
    }), [authenticated, authError, registrationCompleted]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
