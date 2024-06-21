import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from './axiosConfig';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axiosInstance.get('http://localhost:8085/check-session', { withCredentials: true });
                if (response.data.is_authenticated) {
                    setIsAuthenticated(true);
                } else {
                    handleLogout();
                }
            } catch (error) {
                handleLogout();
            }
        };

        checkSession();

        const intervalId = setInterval(checkSession, 600000); // Check every hour

        return () => clearInterval(intervalId);
    }, []);

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('session');
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
