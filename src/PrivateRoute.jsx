import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import PropTypes from 'prop-types';

const PrivateRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? element : <Navigate to="/" />;
};

PrivateRoute.propTypes = {
    element: PropTypes.element.isRequired,
};

export default PrivateRoute;
