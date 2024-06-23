import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Entity from "../../components/Entity/Entity.jsx";
import "./Home.css";
import { useAuth } from "../../AuthContext.jsx";
import { decryptResponse } from "../../utils/decryption";
import {EntityState} from "../../utils/EntityState.jsx";
function Home() {
    const { logout, authenticated } = useAuth();
    const navigate = useNavigate();
    const [entities, setEntities] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [currentEntity, setCurrentEntity] = useState({ name: '', uuid: '' });
    const [newEntity, setNewEntity] = useState(null);
    const [entityStates, setEntityStates] = useState({}); // State management for each entity's state


    useEffect(() => {
        if (!authenticated) {
            navigate("/");
        }
    }, [authenticated, navigate]);

    useEffect(() => {

        Axios.get("http://localhost:8085/entity/list", { withCredentials: true })
            .then((response) => {
                const decryptedResponse = decryptResponse(response);
                setEntities(JSON.parse(decryptedResponse).entities);

                const initialStates = entities.reduce((acc, entity) => {
                    acc[entity.uuid] = EntityState.VIEW;
                    return acc;
                }, {});
                setEntityStates(initialStates);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleDeleteIconClick = (name, uuid) => {
        setCurrentEntity({ name, uuid });
        setShowPopup(true);
    };

    const handleUpdateIconClick = (uuid) => {
        setEntityStates(prevStates => ({
            ...prevStates,
            [uuid]: EntityState.EDIT
        }));
    };

    const handleSaveUpdatedEntity = (entityData, file, unchanged) => {

        if (!unchanged){

            const formData = new FormData();

            if (file){
                formData.append("file", file);
            }

            formData.append("entity", JSON.stringify(entityData));

            Axios.post(`http://localhost:8085/entity/update`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((response) => {

                    const decryptedResponse = decryptResponse(response);

                    setEntities(prevEntities => prevEntities.map(entity =>
                        entity.uuid === entityData.uuid ? JSON.parse(decryptedResponse).entity : entity
                    ));

                    setEntityStates(prevStates => ({
                        ...prevStates,
                        [entityData.uuid]: EntityState.VIEW
                    }));

                })
                .catch((error) => {
                    console.error("Error updating entity:", error);
                    // Handle error if needed
                });
        }else{
            setEntityStates(prevStates => ({
                ...prevStates,
                [entityData.uuid]: EntityState.VIEW
            }));
        }
    };

    const handleCancelIconClick = (uuid) => {
        setEntityStates(prevStates => ({
            ...prevStates,
            [uuid]: EntityState.VIEW
        }));
    };

    const closePopup = () => {
        setShowPopup(false);
        setCurrentEntity({ name: '', uuid: '' });
    };

    const confirmDelete = (uuid) => {
        Axios.post(`http://localhost:8085/entity/delete/${uuid}`, undefined, {
            withCredentials: true,
        })
            .then(() => {
                closePopup();
                const updatedEntities = entities.filter((entity) => entity.uuid !== uuid);
                setEntities(updatedEntities);

                const { [uuid]: _, ...restStates } = entityStates;
                setEntityStates(restStates);
            })
            .catch((error) => {
                console.error("Error deleting entity:", error);
                // Handle error if needed
            });
    };

    const handleNew = () => {
        const emptyEntity = {
            uuid: '',
            name: '',
            type: 6,
            password: '',
            description: undefined,
            email_address: undefined,
            username: undefined
        };
        setNewEntity(emptyEntity);
    };

    const handleSaveNewEntity = (entityData, file) => {
        const formData = new FormData();
        if (file) {
            formData.append("file", file);
        }
        formData.append("entity", JSON.stringify(entityData));
        Axios.post(`http://localhost:8085/entity`, formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => {

                const decryptedResponse = decryptResponse(response);

                setEntities(prevEntities => [...prevEntities, JSON.parse(decryptedResponse).entity]);
                setNewEntity(null);
            })
            .catch((error) => {
                console.error("Error creating entity:", error);
            });
    };

    const handleCancelNewEntity = () => {
        setNewEntity(null);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            {entities && (
                <div className={"entity-list"}>
                    {entities.map((entity) => (
                        <Entity
                            key={entity.uuid}
                            entityState={entityStates[entity.uuid] || EntityState.VIEW}
                            entityData={entity}
                            handleDeleteIconClick={() => handleDeleteIconClick(entity.name, entity.uuid)}
                            handleUpdateIconClick={() => handleUpdateIconClick(entity.uuid)}
                            handleSaveIconClickOnUpdate={(entityData, file, unchanged) => handleSaveUpdatedEntity(entityData, file, unchanged)}
                            handleCancelIconClick={() => handleCancelIconClick(entity.uuid)}
                        />
                    ))}
                </div>
            )}
            {newEntity && (
                <Entity
                    key="new-entity"
                    entityState={EntityState.CREATE}
                    entityData={newEntity}
                    handleSaveIconClickOnCreate={handleSaveNewEntity}
                    handleCancelIconClick={handleCancelNewEntity}
                />
            )}
            <div className={"button-section"}>
                <button onClick={handleNew} className="create-button">
                    New
                </button>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <p id="popupMessage">
                            Are you sure you want to delete {currentEntity.name} ?
                        </p>
                        <button onClick={() => confirmDelete(currentEntity.uuid)}>Yes</button>
                        <button onClick={closePopup}>No</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;
