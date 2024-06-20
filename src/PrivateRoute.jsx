import {Route, useNavigate} from 'react-router-dom';
import { useAuth } from './AuthContext';
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();

    const navigate = useNavigate()

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    navigate("/")
                )
            }
        />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
};
export default PrivateRoute;
