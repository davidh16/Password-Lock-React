import "./index.css"
import logo from "../assets/logo.png"
import {useRef, useState} from "react";
import Axios from "axios";

function Login(){

    const [credentials, setCredentials] = useState({
        email_address: "",
        password: "",
        remember_me: false
    });

    // const emailAddress = useRef("")

    // const handleChange = (e) => {
    //     const credentials = {...formData}
    //     credentials[e.target.id] = e.target.value
    //     setFormData(credentials)
    // };

    function handleEmailAddressInputChange(e) {
        setCredentials({...credentials, email_address: e.target.value})
        if (document.getElementById("error-message").style.display === "flex") {
            document.getElementById("error-message").style.display = "none"
        }
    }

    function handlePasswordInputChange(e) {
        setCredentials({...credentials, password: e.target.value})
        if (document.getElementById("error-message").style.display === "flex") {
            document.getElementById("error-message").style.display = "none"
        }
    }

    function handleOnSubmit(){
        Axios.post("http://localhost:8085/login", JSON.stringify(credentials)).catch((error) => {
            if (error.response.status === 401){
                document.getElementById("error-message").style.display = "flex"
            }
        })
        setCredentials(undefined)
        document.getElementById("email-address").value = ""
        document.getElementById("password").value = ""
    }

    return(
        <>
            <img src={logo}/>
            <div className={"error-message"} id={"error-message"}>
                <label>Wrong email address or password</label>
            </div>
            <div className={"login-container"}>
                <input type={"text"} placeholder={"username"} id={"email-address"} onChange={e => handleEmailAddressInputChange(e)}/>
                <input type={"password"} placeholder={"password"} id={"password"} onChange={e => handlePasswordInputChange(e)}/>

                <div className={"remember-me-forgot-password"}>
                    <label>
                        <input type={"checkbox"} id={"remember-me"} onChange={e => setCredentials({...credentials, remember_me: e.target.checked})}/>
                        Remember me
                    </label>

                    <a href={"/forgot-password"}>Forgot password</a>
                </div>

                <button id={"login-button"} onClick={handleOnSubmit}>Login</button>

                <label>Don't have an account ? <a href={"/register"}>Register</a></label>
            </div>
        </>

    )
}

export default Login