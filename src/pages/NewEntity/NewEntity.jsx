import {useNavigate} from "react-router-dom";
import TextInput from "../../components/TextInput/TextInput.jsx";
import {useRef, useState} from "react";
import Axios from "axios";
import "./NewEntity.css";
import uploadIcon from "../../assets/upload-icon.png"
import viewPasswordIcon from "../../assets/hidden.png"

function NewEntity() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [entity, setEntity] = useState({
        email_address: undefined,
        password: undefined,
        username: undefined,
        name: undefined,
        type: 6,
        description: undefined,
        icon: undefined
    });

    const [icon, setIcon] = useState(uploadIcon);
    const navigate = useNavigate();

    function handleCancel() {
        navigate("/home");
    }

    function handleCreate() {
        const formData = new FormData();
        formData.append('file', icon);
        formData.append('entity', JSON.stringify(entity));

        Axios.post("http://localhost:8085/entity", formData, {
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
                    setErrorMessage("Error occurred while creating the entity.");
                }
            });
    }

    function handleInputChange(e, field) {
        setEntity({ ...entity, [field]: e.target.value });
        setErrorMessage(null);
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log("evo ga")
        if (file) {
            console.log("evo ga")
            const reader = new FileReader();
            reader.onloadend = () => {
                setIcon(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const fileInputRef = useRef(null);
    const handleIconClick = () => {
        console.log("nesto")
        if (fileInputRef.current) {
            console.log("bla")
            fileInputRef.current.click();
        }
    };

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
                        <TextInput type="text" placeholder="Name" id="entity-name" onChange={(e) => handleInputChange(e, 'name')} />

                        <input className={"img-input"} type="file"  onChange={handleFileChange}  ref={fileInputRef}/>
                        <img src={uploadIcon} className={"entity-icon"} onClick={handleIconClick}/>
                    </div>
                    <div className={"entity-data"}>
                        <TextInput type="text" placeholder="Email address" id="entity-email-address" onChange={(e) => handleInputChange(e, 'email_address')} />
                        <TextInput type="text" placeholder="Username" id="entity-username" onChange={(e) => handleInputChange(e, 'username')} />
                        <TextInput type="password" placeholder="Password" id="entity-password" onChange={(e) => handleInputChange(e, 'password')} icon={viewPasswordIcon}/>
                        <TextInput type="text" placeholder="Description" id="entity-description" onChange={(e) => handleInputChange(e, 'description')} />
                    </div>
                </div>
                <div className={"button-section"}>
                    <button onClick={handleCreate}>Create</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </>

    );
}

export default NewEntity;