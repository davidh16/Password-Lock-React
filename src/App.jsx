import Login from "./pages/Login/Login.jsx";
import "./index.css"
import {
    BrowserRouter as Router,
    Routes,
    Route, Navigate,
    BrowserRouter
} from "react-router-dom";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";
import PersonalQuestions from "./pages/PersonalQuestions/PersonalQuestions.jsx";
import Home from "./pages/Home/Home.jsx";
import CreateOrUpdateEntity from "./pages/CreateOrUpdateEntity/CreateOrUpdateEntity.jsx";
import {AuthProvider, useAuth} from "./AuthContext";
import PropTypes from "prop-types";


// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children }) => {
    const { authenticated } = useAuth();
    if (!authenticated) {
        return <Navigate to="/" />;
    }
    return children;
};

ProtectedRoute.propTypes = {
    element: PropTypes.node.isRequired,
};

function App() {
    // eslint-disable-next-line react/prop-types
  return (
    <>
        <BrowserRouter>
            {/*<AuthProvider>*/}
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
                    path="/personal-questions"
                    element={ <PersonalQuestions/>}
                />
                <Route
                    exact
                    path="/home"
                    element={ <Home/>}
                />
                {/*<Route*/}
                {/*    exact*/}
                {/*    path="/create-or-update-entity"*/}
                {/*    element={ <CreateOrUpdateEntity/>} />}*/}
                {/*/>*/}
            </Routes>
            {/*</AuthProvider>*/}
        </BrowserRouter>
    </>
  )
}

export default App
