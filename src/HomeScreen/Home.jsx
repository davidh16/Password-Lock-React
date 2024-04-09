import "./index.css"
import logo from "../assets/logo.png"

function Home(){
    return(
        <>
            <img src={logo}/>
            <div className={"login-container"}>
                <input type={"text"} placeholder={"username"} id={"username-input"}/>
                <input type={"password"} placeholder={"password"} id={"password-input"}/>

                <div className={"remember-me-forgot-password"}>
                    <label>
                        <input type={"checkbox"} id={"remember-me-input"}/>
                        Remember me
                    </label>

                    <a href={"/forgot-password"}>Forgot password</a>
                </div>

                <button id={"login-button"}>Login</button>

                <a href={"/register"}>Don't have an account ? Register</a>
            </div>
        </>

    )
}

export default Home