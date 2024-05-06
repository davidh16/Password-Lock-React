import logo from "../../assets/logo.png";
import TextInput from "../../components/TextInput/TextInput.jsx";
import {useEffect, useState} from "react";
import Axios from "axios";
import "./ForgotPassword.css"


function ForgotPassword(){

    const [emailAddress, setCredentials] = useState("");

    const [submitted, setSubmitted] = useState(false)

    const [timer, setTimer] = useState(20)

    useEffect(() => {
        let intervalId;
        if (timer > 0) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            setSubmitted(false)
        }

        return () => {
            clearInterval(intervalId); // Cleanup function to clear interval on component unmount or when timer resets
        };
    }, [timer]);


    const startTimer = () => {
        setTimer(20);
    };


    function handleEmailAddressInputChange(e) {
        setCredentials(e.target.value)
    }

    function handleOnSubmit(){

        const request = {
            email_address: emailAddress
        }

        Axios.post("http://localhost:8085/forgot-password", JSON.stringify(request)).then((response)=>console.log(response))

        startTimer()
        setSubmitted(true)
    }

    return(
        <>
            <img src={logo} alt={"logo"}/>
            <div className={"container"}>
                {!submitted && <TextInput type={"text"} placeholder={"email address"} id={"email-address"} onChange={e => handleEmailAddressInputChange(e)}/>}
                {!submitted && <button id={"button"} onClick={handleOnSubmit}>Send reset link</button>}
                {submitted && <p>{timer}</p>}
            </div>
        </>
    )
}

export default ForgotPassword