import  {useNavigate} from 'react-router-dom';

function Unauthorized() {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div>
            <h1>Unauthorized Access</h1>
            <p>You need to be logged in to access this page.</p>
            <button onClick={handleLoginRedirect}>Go to Login</button>
        </div>
    );
}

export default Unauthorized;
