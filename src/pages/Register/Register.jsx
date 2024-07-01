import logo from "../../assets/logo.png";
import TextInput from "../../components/TextInput/TextInput.jsx";
import {useEffect, useState} from "react";
import validator from "validator";
import "./Register.css"
import axiosInstance from "../../axiosConfig.jsx";
import {useNavigate} from "react-router-dom";

function Register(){

    const navigate = useNavigate()

    const [emailAddress, setEmailAddress] = useState("");

    const [errorMessage, setErrorMessage] = useState(null)

    const [validationError, setValidationError] = useState(null)

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
        setEmailAddress(e.target.value)
        setErrorMessage(null)
    }

    function capitalizeFirstLetter(str) {
        return str[0].toUpperCase() + str.slice(1);
    }

    function handleOnSubmit(){

        if(emailAddress === ""){
            setErrorMessage("Email address not specified")
        }

        if(emailAddress !== undefined && emailAddress !== ""){
            if (!validator.isEmail(emailAddress)) {
                setValidationError("Invalid email address")
            }
        }else {
            setValidationError(null)

            const request = {
                email_address: emailAddress
            }

            axiosInstance.post("register", JSON.stringify(request))
                .then(()=>{
                    setSubmitted(true);
                    setTimer(20);
                })
        }
    }
    function handleOnResendVerificationLink(){

        if(emailAddress !== undefined && emailAddress !== ""){
            if (!validator.isEmail(emailAddress)) {
                setValidationError("Invalid email address")
            }
        }else {

        const request = {
            email_address: emailAddress
        }

        axiosInstance.post("resend-verification-email", JSON.stringify(request)).catch(()=>{
            navigate("/error")
        })

        startTimer(5)
        setSubmitted(false)
        }
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
            <div className={"input-container"}>

                <div className="email-address-input">
                    {!submitted && <TextInput inputDisplay={false} type={"text"} placeholder={"email address"} onChange={e => handleEmailAddressInputChange(e)} error={validationError}/>}
                </div>

                {!submitted && <button onClick={handleOnSubmit}>Register</button>}
                {!submitted && <label>{"Already have an account ?"} <a href={"/"} >Login</a></label>}
                {submitted && <div className={"timer"}>
                    <p>Verification link has been sent to your email.</p>
                    <p>To resend a link, please wait {timer} seconds.</p>
                    {timer <= 0 && <p className={"link"} onClick={handleOnResendVerificationLink}>Resend verification link</p>}
                </div>}
            </div>

        </>
    )
}

export default Register