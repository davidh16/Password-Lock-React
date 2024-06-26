import logo from "../../assets/logo.png";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../AuthContext.jsx";

function Error(){

    const navigate = useNavigate()

    function handleOnButtonClick(){
        navigate("/home")
    }

    const { authenticated } = useAuth();

    function handleOnLogoClick(){
        if (authenticated){
            navigate("/home")
        }else {
            navigate("/")
        }
    }

    return(
        <>
            <img src={logo} alt={"logo"} onClick={handleOnLogoClick}/>
            <div>
                <h3>
                    Oops something went wrong, head over to the home page and please try again.
                </h3>
                <button onClick={handleOnButtonClick}>Home</button>
            </div>

        </>
    )
}

export default Error