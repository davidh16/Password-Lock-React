import "./Login.css"
import logo from "../../assets/logo.png"
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import TextInput from "../../components/TextInput/TextInput.jsx";
import {useAuth} from "../../AuthContext.jsx";

function Login(){

    const { login, authenticated, authError, resetAuthError, registrationCompleted } = useAuth();

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

    useEffect(() => {

        if (authenticated) {
            if (registrationCompleted){
                navigate("/home")
            }else{
                navigate("/personal-questions")
            }
        }
    }, [authenticated, registrationCompleted, navigate]);

    async function handleOnSubmit() {
        try {
            await login(credentials);
        } catch (error) {
            console.log(error); // Handle error if necessary
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
                <TextInput inputDisplay={false} type={"text"} placeholder={"email address"} id={"email-address"} onChange={e => handleInputChange('email_address', e)}/>
                <TextInput inputDisplay={false} type={"password"} placeholder={"password"} id={"password"} onChange={e => handleInputChange('password', e)}/>

                <div className={"remember-me-forgot-password"}>
                    <div className={"nesto"}>
                        <label>
                            Remember me
                        </label>
                        <input type={"checkbox"} id={"remember-me"} onChange={e => handleInputChange('remember_me',e)}/>
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