import logo from "../../assets/logo.png";
import TextInput from "../../components/TextInput/TextInput.jsx";
import {useState} from "react";
import Axios from "axios";
import "./ForgotPassword.css"


function ForgotPassword(){

    const [emailAddress, setCredentials] = useState("");
    function handleEmailAddressInputChange(e) {
        setCredentials(e.target.value)
    }

    function handleOnSubmit(){

        const request = {
            email_address: emailAddress
        }

        Axios.post("http://localhost:8085/forgot-password", JSON.stringify(request)).then((response)=>console.log(response))
    }

    return(
        <>
            <img src={logo} alt={"logo"}/>
            <div className={"container"}>
                <TextInput type={"text"} placeholder={"email address"} id={"email-address"} onChange={e => handleEmailAddressInputChange(e)}/>

                <button id={"button"} onClick={handleOnSubmit}>Send reset link</button>

            </div>
        </>
    )
}

export default ForgotPassword