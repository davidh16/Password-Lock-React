import {createContext, useContext, useEffect, useMemo, useState} from "react";
import axiosInstance, { setAuthInfoUpdater } from "./axiosConfig.jsx";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [authError, setAuthError] = useState(null);
    const [authInfo, setAuthInfo] = useState(() => {
        const savedAuthInfo = localStorage.getItem('authInfo');
        return savedAuthInfo ? JSON.parse(savedAuthInfo) : { authenticated: false, registrationCompleted: false };
    });

    useEffect(() => {
        localStorage.setItem('authInfo', JSON.stringify(authInfo));
    }, [authInfo]);

    useEffect(() => {
        setAuthInfoUpdater(setAuthInfo); // Set the state updater function for the interceptor
    }, []);

    const resetAuthError = () => {
        setAuthError(null);
    };

    // call this function when you want to authenticate the user
    const login = async (credentials) => {
        setAuthError(null)
        await axiosInstance.post("login", JSON.stringify(credentials)).then(() => {
            setAuthError(null)
        }).then(() => {
            axiosInstance.post("me", undefined, {withCredentials: true}).then(
                (response) => {
                    setAuthInfo(prevState => ({
                        ...prevState,
                        authenticated: true,
                        registrationCompleted: response.data["completed"]
                    }))
                })
        }).catch((error)=>{
            setAuthInfo(prevState => ({
                ...prevState,
                authenticated: false,
                registrationCompleted: false
            }))

            if (error.response) {
                if (error.response.status === 401) {
                    setAuthError("Wrong email address or password");
                } else {
                    throw authError
                }
            } else {
                throw authError
            }
            throw authError;
        })
    }

    // call this function to sign out logged in user
    const logout = () => {
        axiosInstance.post("logout", undefined,{withCredentials: true})
            .then(() => {

                setAuthInfo(prevState => ({
                    ...prevState,
                    authenticated: false,
                    registrationCompleted: false
                }))

            })
            .catch((error) => {
                console.log(error);
            });
    };

    const value = useMemo(() => ({
        login,
        logout,
        authError,
        resetAuthError,
        setAuthInfo,
        authInfo
    }), [authError, authInfo]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
