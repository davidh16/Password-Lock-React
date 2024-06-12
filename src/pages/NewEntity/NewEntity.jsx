import {useNavigate} from "react-router-dom";
import TextInput from "../../components/TextInput/TextInput.jsx";
import {useState} from "react";
import Axios from "axios";
import "./NewEntity.css";

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

    const [icon, setIcon] = useState(null);
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
        if (file) {
            setIcon(file);
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
                <TextInput type="text" placeholder="Name" id="entity-name" onChange={(e) => handleInputChange(e, 'name')} />
                <TextInput type="text" placeholder="Email address" id="entity-email-address" onChange={(e) => handleInputChange(e, 'email_address')} />
                <TextInput type="text" placeholder="Username" id="entity-username" onChange={(e) => handleInputChange(e, 'username')} />
                <TextInput type="text" placeholder="Password" id="entity-password" onChange={(e) => handleInputChange(e, 'password')} />
                <TextInput type="text" placeholder="Description" id="entity-description" onChange={(e) => handleInputChange(e, 'description')} />
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleCreate}>Create</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </>

    );
}

export default NewEntity;