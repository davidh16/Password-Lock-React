import { useState } from 'react';
import './Entity.css';
import PropTypes from "prop-types";

function Entity({ name, emailAddress, password, username, description, iconPath}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleCopyText = () => {
        navigator.clipboard.writeText(password).then(() => {
            alert('Text copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`entity-component ${isExpanded ? 'expanded' : ''}`}>
            <h2>{name}</h2>
            {iconPath && <img src={iconPath} alt={name} className="entity-picture"/>}
            <div className="text-container">
                <p>{password}</p>
                <button onClick={handleCopyText} className="copy-icon">📋</button>
            </div>
            <p>{description}</p>
            <button onClick={handleToggleExpand} className="expand-icon">
                {isExpanded ? '🔼' : '🔽'}
            </button>
            {isExpanded && (
                <div className="additional-info">
                    {username && <p>Username : {username}</p>}
                    {emailAddress && <p>Email address : {emailAddress}</p>}
                </div>
            )}
        </div>
    );
}

Entity.propTypes = {
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    emailAddress: PropTypes.string,
    username: PropTypes.string,
    description: PropTypes.string.isRequired,
    iconPath: PropTypes.string,
};
export default Entity;
