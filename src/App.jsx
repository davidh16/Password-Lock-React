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
                    path="/register"
                    element={<Register />}
                />
                <Route
                    exact
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />
                <PrivateRoute
                    exact
                    path="/personal-questions"
                    element={<PersonalQuestions />}
                />
                <PrivateRoute
                    exact
                    path="/home"
                    element={<Home />}
                />
                <PrivateRoute
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
