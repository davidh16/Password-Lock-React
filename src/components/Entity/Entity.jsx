import { useEffect, useRef, useState } from 'react';
import './Entity.css';
import PropTypes from "prop-types";
import Axios from "axios";
import { decryptResponse } from "../../utils/decryption";
import copyIcon from "../../assets/copy.png";
import updateEntityIcon from "../../assets/edit.png";
import deleteEntityIcon from "../../assets/delete.png";
import saveEntityIcon from "../../assets/save.png";
import cancelIcon from "../../assets/cancel.png";
import placeholderIcon from "../../assets/placeholder.png";
import TextInput from "../TextInput/TextInput.jsx";
import Dropdown from "../Dropdown/Dropdown.jsx";
import facebookIcon from "../../assets/facebook.png";
import githubIcon from "../../assets/github.png";
import linkedinIcon from "../../assets/linkedin.png";
import instagramIcon from "../../assets/instagram.png";
import gmailIcon from "../../assets/gmail.png";
import uploadIcon from "../../assets/upload-icon.png";
import { EntityState } from "../../utils/EntityState";
import {validateCreateRequest} from "../../utils/validations.jsx";

const icons = {
    2: facebookIcon,
    1: githubIcon,
    4: linkedinIcon,
    5: instagramIcon,
    3: gmailIcon,
    6: uploadIcon,
};

function Entity({ entityData = {}, handleDeleteIconClick, handleUpdateIconClick, handleSaveIconClickOnUpdate, handleSaveIconClickOnCreate, handleCancelIconClick, entityState }) {
    const [icon, setIcon] = useState(placeholderIcon);
    const [entity, setEntity] = useState(entityData);
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);
    const [initialEntity, setInitialEntity] = useState(entityData);
    const [errors, setErrors] = useState({});

    useEffect(() => {

        if (entityState === EntityState.CREATE){
            setIcon(uploadIcon)
        }

        if (entityData.uuid) {
            Axios.get(`http://localhost:8085/icon/${entityData.uuid}`, { withCredentials: true })
                .then((response) => {
                    const decryptedResponse = JSON.parse(decryptResponse(response));
                    setIcon(decryptedResponse.signed_url);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    const handleInputChange = (e, field) => {
        setEntity({ ...entity, [field]: e.target.value });
    };

    const copyPassword = () => {
        navigator.clipboard.writeText(entityData.password).then(() => {
            alert("Text copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text: ", err);
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setIcon(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEntityIconClick = () => {
        if (entityState !== EntityState.VIEW && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    function handleSelectOption(option) {
        setIcon(icons[option]);
        setEntity({ ...entity, type: option });
    }

    const hasChanges = () => {
        // Check if entity has changed compared to the initial state
        return JSON.stringify(entity) !== JSON.stringify(initialEntity) || file !== null;
    };

    const handleSaveClick = () => {

        const validationErrors = validateCreateRequest(entity)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        }else {
            setErrors({});

            if (entityState === EntityState.EDIT){
                if (hasChanges()) {
                    handleSaveIconClickOnUpdate(entity, file, true);

                    setInitialEntity(entity);

                    setFile(null);
                } else {
                    handleSaveIconClickOnUpdate(entity, file, false);
                }
            }else if(entityState === EntityState.CREATE){
                handleSaveIconClickOnCreate(entity, file);

                setInitialEntity(entity);

                setEntity(entity)

                setFile(null);
            }
        }
    };

    return (
        <div className="entity-container">
            <div className="entity">

                <div className="icon-column">
                    {entityState !== EntityState.VIEW &&  <label>Name:</label>}
                    <div className="input-field">
                        {entityState === EntityState.VIEW ?
                            <TextInput inputDisplay={true} type="text" value={entity.name} />
                            :
                            <TextInput inputDisplay={false} type="text" value={entity.name || ''} onChange={(e) => handleInputChange(e, 'name')} error={errors.name}/>
                        }
                    </div>
                    {entityState !== EntityState.VIEW && <label>Type:</label>}
                    <div className="input-field">
                        {entityState !== EntityState.VIEW && <Dropdown onOptionSelect={handleSelectOption} initialOption={entity.type} />}
                    </div>
                    {entityState !== EntityState.VIEW && <input className="img-input" type="file" onChange={handleFileChange} ref={fileInputRef} />}
                    <img src={icon} className="entity-icon" onClick={handleEntityIconClick} />
                    <div className="entity-hover-icons">
                        {entityState === EntityState.VIEW && <img src={updateEntityIcon} alt="Update" className="action-icon" onClick={handleUpdateIconClick} />}
                        {entityState === EntityState.VIEW && <img src={deleteEntityIcon} alt="Delete" className="action-icon" onClick={handleDeleteIconClick} />}
                        {(entityState === EntityState.EDIT || entityState === EntityState.CREATE) && <img src={saveEntityIcon} alt="Save" className="action-icon" onClick={handleSaveClick} />}
                        {(entityState === EntityState.EDIT || entityState === EntityState.CREATE) && <img src={cancelIcon} alt="Cancel" className="action-icon" onClick={handleCancelIconClick} />}
                    </div>
                </div>

                <div className="entity-data">


                    <div className={"test"}>
                        <label>Password:</label>
                        <div className="input-field">
                            {entityState === EntityState.VIEW ?
                                <TextInput inputDisplay={true} type="password" value={entity.password} />
                                :
                                <TextInput inputDisplay={false} type="password" value={entity.password || ''} onChange={(e) => handleInputChange(e, 'password')} error={errors.password}/>
                            }
                            {entityState === EntityState.VIEW && <img className="copy-icon" src={copyIcon} onClick={copyPassword} alt="Copy" />}
                        </div>
                    </div>



                    {(entityData.description || entityState !== EntityState.VIEW ) &&
                        <div className={"test"}>
                            <label>Description:</label>
                            <div className="input-field">
                                {entityState === EntityState.VIEW ?
                                    <TextInput inputDisplay={true} type="text" value={entity.description} />
                                    :
                                    <TextInput inputDisplay={false} type="text" value={entity.description || ''} onChange={(e) => handleInputChange(e, 'description')}/>
                                }
                            </div>
                        </div>
                    }
                    {(entityData.email_address || entityState !== EntityState.VIEW ) &&
                        <div className={"test"}>
                            <label>Email address:</label>
                            <div className="input-field">
                                {entityState === EntityState.VIEW ?
                                    <TextInput inputDisplay={true} type="text" value={entity.email_address} />
                                    :
                                    <TextInput inputDisplay={false} type="text" value={entity.email_address || ''} onChange={(e) => handleInputChange(e, 'email_address')} error={errors.email_address}/>
                                }
                            </div>
                        </div>
                    }
                    {(entityData.username || entityState !== EntityState.VIEW) &&
                        <div className={"test"}>
                            <label>Username:</label>
                            <div className="input-field">
                                {entityState === EntityState.VIEW ?
                                    <TextInput inputDisplay={true} type="text" value={entity.username} />
                                    :
                                    <TextInput inputDisplay={false} type="text" value={entity.username || ''} onChange={(e) => handleInputChange(e, 'username')} />
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

Entity.propTypes = {
    entityData: PropTypes.object.isRequired,
    entityState: PropTypes.oneOf(Object.values(EntityState)).isRequired,
    handleDeleteIconClick: PropTypes.func,
    handleUpdateIconClick: PropTypes.func,
    handleSaveIconClickOnUpdate: PropTypes.func,
    handleSaveIconClickOnCreate: PropTypes.func,
    handleCancelIconClick: PropTypes.func,
};

export default Entity;
