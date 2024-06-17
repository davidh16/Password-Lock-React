import "./Login.css"
import logo from "../../assets/logo.png"
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import TextInput from "../../components/TextInput/TextInput.jsx";
import icon from "../../assets/hidden.png"

function Login(){

    const [credentials, setCredentials] = useState({
        email_address: "",
        password: "",
        remember_me: false
    });

    const [errorMessage, setErrorMessage] = useState(null)

    const navigate = useNavigate();

    function handleEmailAddressInputChange(e) {
        setCredentials({...credentials, email_address: e.target.value})
        setErrorMessage(null)
    }

    function handlePasswordInputChange(e) {
        setCredentials({...credentials, password: e.target.value})
        setErrorMessage(null)

    }

    function handleOnSubmit(){
        Axios.post("http://localhost:8085/login", JSON.stringify(credentials), { withCredentials: true })
            .then((response)=>{
                console.log(response)

                setErrorMessage(null)

                Axios.post("http://localhost:8085/me", undefined,{ withCredentials: true }).then(
                    (response)=>{
                        if(response.data["completed"]){
                            navigate("/home")
                        }else {
                            navigate("/personal-questions")
                        }
                    }
                )
                    .catch((error) => {
                    console.log(error)
                })


            })
            .catch((error) => {
                if (error.response){
                    if (error.response.status === 401){
                        setErrorMessage("Wrong email address or password")

                    }else {
                        setErrorMessage("Something went wrong, please try again")
                    }
                }else {
                    setErrorMessage("Something went wrong, please try again")
                }
            })
    }

    return(
        <>
            <a href="/"><img src={logo} alt={"logo"}/></a>
            <div className={"error-message-box"}>
                {errorMessage && <div className={"error-message"} id={"error-message"}>
                    <label>{errorMessage}</label>
                </div>}
            </div>
            <div className={"login-container"}>
                <TextInput type={"text"} placeholder={"email address"} id={"email-address"} onChange={e => handleEmailAddressInputChange(e)}/>
                <TextInput type={"password"} placeholder={"password"} id={"password"} onChange={e => handlePasswordInputChange(e)} icon={icon}/>

                <div className={"remember-me-forgot-password"}>
                    <div className={"nesto"}>
                        <label>
                            Remember me
                        </label>
                        <input type={"checkbox"} id={"remember-me"} onChange={e => setCredentials({...credentials, remember_me: e.target.checked})}/>
                    </div>

                    <a href={"/forgot-password"} >Forgot password</a>
                </div>

                <button id={"Login-button"} onClick={handleOnSubmit}>Login</button>

                <label>{"Don't have an account ?"} <a href={"/register"} >Register</a></label>
            </div>
        </>

    )
}

export default Login