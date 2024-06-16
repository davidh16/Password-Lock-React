import { useNavigate, useLocation } from "react-router-dom";
import TextInput from "../../components/TextInput/TextInput.jsx";
import { useRef, useState, useEffect } from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import Axios from "axios";
import "./CreateOrUpdateEntity.css";

import uploadIcon from "../../assets/upload-icon.png";
import viewPasswordIcon from "../../assets/hidden.png";
import facebookIcon from "../../assets/facebook.png";
import githubIcon from "../../assets/github.png";
import linkedinIcon from "../../assets/linkedin.png";
import instagramIcon from "../../assets/instagram.png";
import gmailIcon from "../../assets/gmail.png";

const icons = {
    facebook: facebookIcon,
    github: githubIcon,
    linkedin: linkedinIcon,
    instagram: instagramIcon,
    gmail: gmailIcon,
    custom: uploadIcon,
};

function CreateOrUpdateEntity() {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        update = false,
        name = '',
        emailAddress = '',
        username = '',
        password = '',
        type = 6,
        description = '',
        iconPath = '',
        uuid = ''
    } = location.state || {};

    const [errorMessage, setErrorMessage] = useState(null);
    const [entity, setEntity] = useState({
        email_address: emailAddress,
        password: password,
        username: username,
        name: name,
        type: type,
        description: description,
        icon: iconPath,
        uuid: uuid
    });

    const [icon, setIcon] = useState(uploadIcon);

    useEffect(() => {

        if (iconPath) {
            setIcon(iconPath);
        }
        return () => {
            if (icon !== uploadIcon) {
                URL.revokeObjectURL(icon);
            }
        };
    }, [icon, iconPath]);

    function handleCancel() {
        navigate("/home");
    }

    function handleCreateOrUpdate() {
        const formData = new FormData();
        formData.append('file', icon);
        formData.append('entity', JSON.stringify(entity));

        const url = update ? `http://localhost:8085/entity/update` : `http://localhost:8085/entity`;

        Axios.post(url, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(() => {
                setErrorMessage(null);
                navigate("/home");
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    const errorMsg = update ? `Error occurred while updating the entity.` : `Error occurred while creating/updating the entity.`;
                    setErrorMessage(errorMsg);
                }
            });
    }

    function handleInputChange(e, field) {
        setEntity({ ...entity, [field]: e.target.value });
        setErrorMessage(null);
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setIcon(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const fileInputRef = useRef(null);
    const handleIconClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    function handleSelectOption(option) {
        setIcon(icons[option]);
    }

    return (
        <>
            <div className={"error-message-box"}>
                {errorMessage && <div className={"error-message"} id={"error-message"}>
                    <label>{errorMessage}</label>
                </div>}
            </div>
            <div className="new-entity-container">
                <div className={"entity"}>
                    <div className={"icon-column"}>
                        <TextInput type="text" placeholder="Name" id="entity-name" value={entity.name} onChange={(e) => handleInputChange(e, 'name')} />
                        <input className={"img-input"} type="file" onChange={handleFileChange} ref={fileInputRef} />
                        <img src={icon} className={"entity-icon"} onClick={handleIconClick} alt="Entity Icon" />
                    </div>
                    <div className={"entity-data"}>
                        <Dropdown onOptionSelect={handleSelectOption} />
                        <TextInput type="text" placeholder="Email address" id="entity-email-address" value={entity.email_address} onChange={(e) => handleInputChange(e, 'email_address')} />
                        <TextInput type="text" placeholder="Username" id="entity-username" value={entity.username} onChange={(e) => handleInputChange(e, 'username')} />
                        <TextInput type="password" placeholder="Password" id="entity-password" value={entity.password} onChange={(e) => handleInputChange(e, 'password')} icon={viewPasswordIcon} />
                        <TextInput type="text" placeholder="Description" id="entity-description" value={entity.description} onChange={(e) => handleInputChange(e, 'description')} />
                    </div>
                </div>
                <div className={"button-section"}>
                    <button onClick={handleCreateOrUpdate}>{update ? 'Update' : 'Create'}</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </>
    );
}

export default CreateOrUpdateEntity;
