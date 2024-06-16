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
import NewEntity from "./pages/CreateOrUpdateEntity/CreateOrUpdateEntity.jsx";
import CreateOrUpdateEntity from "./pages/CreateOrUpdateEntity/CreateOrUpdateEntity.jsx";

function App() {
  return (
    <>
        <Router>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={<Login />}
                />
                <Route
                    exact
                    path="/personal-questions"
                    element={<PersonalQuestions />}
                />
                <Route
                    exact
                    path="/home"
                    element={<Home />}
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
                    path="/create-or-update-entity"
                    element={<CreateOrUpdateEntity />}
                />
            </Routes>
        </Router>
    </>
  )
}

export default App
