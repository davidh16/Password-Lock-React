import logo from "../../assets/logo.png";
import {useLocation, useNavigate} from "react-router-dom";
import "./Error.css"

function Error(){

    const navigate = useNavigate()

    const location = useLocation();

    // Function to get query parameters
    const getQueryParams = (search) => {
        return new URLSearchParams(search);
    };

    const queryParams = getQueryParams(location.search);
    const errorType = queryParams.get('type');
    function handleOnButtonClick(){
        navigate("/")
    }

    function handleOnLogoClick(){
        // setAuthInfo(prevState => ({
        //     ...prevState,
        //     authenticated: false,
        //     registrationCompleted: false
        // }));

        navigate("/")
    }

    return(
        <>
            <img src={logo} alt={"logo"} onClick={handleOnLogoClick}/>
            {errorType === 'session' ?
                <div className={"message"}>
                    <h3>
                        Looks like your session has expired...
                    </h3>
                    <h3>
                        Safety first right ?
                    </h3>
                    <h3>
                        Head over to the login page and log back in.
                    </h3>
                </div>
                :
                <div className={"message"}>
                    <h3>
                        Oops something went wrong...
                    </h3>
                    <h3>
                        Head over to the login page and please try again.
                    </h3>
                </div>
            }
            <div className={"button"}>
                <button onClick={handleOnButtonClick}>Login</button>
            </div>
        </>
    )
}

export default Error