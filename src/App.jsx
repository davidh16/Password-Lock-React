import Login from "./pages/Login/Login.jsx";
import "./index.css"
import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";
import PersonalQuestions from "./pages/PersonalQuestions/PersonalQuestions.jsx";
import Home from "./pages/Home/Home.jsx";
import {AuthProvider, useAuth} from "./AuthContext";
import PropTypes from "prop-types";
import Verification from "./pages/Verification/Verification.jsx";
import Error from "./pages/Error/Error.jsx";


// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children }) => {
    const {authInfo } = useAuth();
    if (!authInfo.authenticated) {
        return <Navigate to="/" />;
    }else if(!authInfo.registrationCompleted){
            return <Navigate to="/personal-questions" />;
    }
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

function App() {
    // eslint-disable-next-line react/prop-types
  return (
    <>
        <BrowserRouter>
            <AuthProvider>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={<Login />}
                />
                <Route
                    exact
                    path="/register"
                    element={<Register />}
                />
                <Route
                    exact
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />
                <Route
                    exact
                    path="/verify"
                    element={ <Verification/>}
                />
                <Route
                    exact
                    path="/personal-questions"
                    element={ <PersonalQuestions/>}
                />
                <Route
                    exact
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                        }
                />
                <Route
                    exact
                    path="/error"
                    element={ <Error/>}
                />
            </Routes>
            </AuthProvider>
        </BrowserRouter>
    </>
  )
}

export default App
