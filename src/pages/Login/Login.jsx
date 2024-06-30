import "./Login.css"
import logo from "../../assets/logo.png"
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import TextInput from "../../components/TextInput/TextInput.jsx";
import {useAuth} from "../../AuthContext.jsx";

function Login(){

    const { login, authError, resetAuthError, authInfo } = useAuth();

    const [credentials, setCredentials] = useState({
        email_address: "",
        password: "",
        remember_me: false
    });

    const navigate = useNavigate();

    function handleInputChange(type, e) {
        setCredentials({...credentials, [type]: e.target.value})
        resetAuthError()
    }

    function handleCheckboxChange(e){
        setCredentials({...credentials, remember_me: e.target.checked})
    }

    useEffect(() => {
        if (authInfo.authenticated) {
            if (authInfo.registrationCompleted) {
                navigate("/home");
            } else {
                navigate("/personal-questions");
            }
        }
    }, [authInfo, navigate]);

    async function handleOnSubmit() {
        try {
            await login(credentials);
        } catch (error) {
            navigate("/error")
        }
    }

    return(
        <>
            <a href="/"><img src={logo} alt={"logo"}/></a>
            <div className={"error-message-box"}>
                {authError && <div className={"error-message"} id={"error-message"}>
                    <label>{authError}</label>
                </div>}
            </div>
            <div className={"login-container"}>

                <div className={"credentials"}>
                    <div className={"input"}>
                        <TextInput inputDisplay={false} type={"text"} placeholder={"email address"} onChange={e => handleInputChange('email_address', e)}/>
                    </div>
                    <div className={"input"}>
                        <TextInput inputDisplay={false} type={"password"} placeholder={"password"} onChange={e => handleInputChange('password', e)}/>

                    </div>
                </div>

                <div className={"remember-me-forgot-password"}>
                    <div className={"nesto"}>
                        <label>
                            Remember me
                        </label>
                        <input type={"checkbox"} onChange={e => handleCheckboxChange(e)}/>
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