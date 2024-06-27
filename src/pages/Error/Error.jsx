import logo from "../../assets/logo.png";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../AuthContext.jsx";
import "./Error.css"

function Error(){

    const navigate = useNavigate()

    function handleOnButtonClick(){
        navigate("/home")
    }

    const { authInfo } = useAuth();

    function handleOnLogoClick(){
        if (authInfo.authenticated && authInfo.registrationCompleted){
            navigate("/home")
        }else {
            navigate("/")
        }
    }

    return(
        <>
            <img src={logo} alt={"logo"} onClick={handleOnLogoClick}/>
            <div className={"message"}>
                <h3>
                    Oops something went wrong...
                </h3>
                <h3>
                    Head over to the {(authInfo.authenticated && authInfo.registrationCompleted) ? "home" : "login"} page and please try again.
                </h3>
            </div>
            <div className={"button"}>
                {(authInfo.authenticated && authInfo.registrationCompleted) && <button onClick={handleOnButtonClick}>Home</button>}
                {!(authInfo.authenticated && authInfo.registrationCompleted) && <button onClick={handleOnButtonClick}>Login</button>}
            </div>
        </>
    )
}

export default Error