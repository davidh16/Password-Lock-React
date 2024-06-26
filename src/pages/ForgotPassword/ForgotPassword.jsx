import logo from "../../assets/logo.png";
import TextInput from "../../components/TextInput/TextInput.jsx";
import {useEffect, useState} from "react";
import axiosInstance from "../../axiosConfig.jsx";
import "./ForgotPassword.css"
import {useNavigate} from "react-router-dom";


function ForgotPassword(){

    const navigate = useNavigate()

    const [emailAddress, setCredentials] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const [submitted, setSubmitted] = useState(false)

    const [timer, setTimer] = useState(20)

    useEffect(() => {
        let intervalId;
        if (timer > 0) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
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
        setErrorMessage()
    }

    function handleOnSubmit(){

        if (emailAddress === ""){
            setErrorMessage("Email address is not specified")
            return
        }

        const request = {
            email_address: emailAddress
        }

        axiosInstance.post("forgot-password", JSON.stringify(request)).then((response)=>console.log(response))

        startTimer()
        setSubmitted(true)
    }

    function handleOnResendResetLink(){
        const request = {
            email_address: emailAddress
        }

        axiosInstance.post("forgot-password", JSON.stringify(request)).then((response)=>console.log(response))

        startTimer(20)
        setSubmitted(true)
    }

    function handleOnLogoClick(){
        navigate("/")
    }

    return(
        <>
            <img src={logo} alt={"logo"} onClick={handleOnLogoClick}/>
            <div className={"error-message-box"}>
                {errorMessage && <div className={"error-message"} id={"error-message"}>
                    <label>{errorMessage}</label>
                </div>}
            </div>
            <div className={"container"}>
                {!submitted && <TextInput inputDisplay={false} ype={"text"} placeholder={"email address"} id={"email-address"} onChange={e => handleEmailAddressInputChange(e)}/>}
                {!submitted && <button id={"button"} onClick={handleOnSubmit}>Send reset link</button>}
                {submitted && <div className={"timer"}>
                    <p>Reset link has been sent to your email.</p>
                    <p>To resend a link, please wait {timer} seconds.</p>
                    {timer <= 0 && <p className={"link"} onClick={handleOnResendResetLink}>Resend password reset link</p>}
                </div>}
            </div>
        </>
    )
}

export default ForgotPassword