import logo from "../../assets/logo.png";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Axios from "axios";

function Verification(){

    const navigate = useNavigate()

    function handleOnButtonClick(){
        navigate("/")
    }

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");


    useEffect(() => {
        const request = {
            token: token
        }

        Axios.post("http://localhost:8085/verify", JSON.stringify(request)).catch((error) => {
            if (error.response){
                navigate("/error")
            }
        })
    }, []);

    return(
        <>
            <a href="/"><img src={logo} alt={"logo"}/></a>
            <div className={"login-container"}>
                <h3>
                    You have successfully verified your account, head over to the login page to continue with using Password Lock
                </h3>
                <button onClick={handleOnButtonClick}>Login</button>
            </div>

        </>
    )
}

export default Verification