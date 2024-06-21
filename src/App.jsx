import Login from "./pages/Login/Login.jsx";
import "./index.css"
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";
import PersonalQuestions from "./pages/PersonalQuestions/PersonalQuestions.jsx";
import Home from "./pages/Home/Home.jsx";
import CreateOrUpdateEntity from "./pages/CreateOrUpdateEntity/CreateOrUpdateEntity.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import {AuthProvider} from "./AuthContext.jsx";

function App() {

    return (
        <>
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/personal-questions" element={<PrivateRoute element={PersonalQuestions} />} />
                        <Route path="/home" element={<PrivateRoute element={Home} />} />
                        <Route path="/create-or-update-entity" element={<PrivateRoute element={CreateOrUpdateEntity} />} />
                    </Routes>
                </AuthProvider>
            </Router>
        </>
    );
}

export default App
