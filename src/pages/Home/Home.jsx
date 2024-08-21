import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig.jsx";
import Entity from "../../components/Entity/Entity.jsx";
import "./Home.css";
import { useAuth } from "../../AuthContext.jsx";
import { decryptResponse } from "../../utils/decryption";
import {EntityState} from "../../utils/EntityState.jsx";
function Home() {

    const { logout } = useAuth();
    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);

    const [entities, setEntities] = useState([]);
    const [currentEntity, setCurrentEntity] = useState({ name: '', uuid: '' });
    const [entityStates, setEntityStates] = useState({});
    const [newEntity, setNewEntity] = useState(null);

    useEffect(() => {
        axiosInstance.get("entity/list", { withCredentials: true })
            .then((response) => {

                console.log(response)

                const decryptedResponse = decryptResponse(response);
                setEntities(JSON.parse(decryptedResponse).entities);

                const initialStates = entities.reduce((acc, entity) => {
                    acc[entity.uuid] = EntityState.VIEW;
                    return acc;
                }, {});
                setEntityStates(initialStates);
            })
            .catch((error) => {
                console.log(error)
                // navigate("/error")
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

    const handleSaveUpdatedEntity = (entityData, file, hasChanges) => {

        if (hasChanges){
            const formData = new FormData();

            if (file){
                formData.append("file", file);
            }

            formData.append("entity", JSON.stringify(entityData));

            axiosInstance.post(`entity/update`, formData, {
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
                .catch(() => {
                    navigate("/error")
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
        axiosInstance.post(`entity/delete/${uuid}`, undefined, {
            withCredentials: true,
        })
            .then(() => {
                closePopup();
                const updatedEntities = entities.filter((entity) => entity.uuid !== uuid);
                setEntities(updatedEntities);

                // eslint-disable-next-line no-unused-vars
                const { [uuid]: _, ...restStates } = entityStates;
                setEntityStates(restStates);
            })
            .catch(() => {
                navigate("/error")
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
        axiosInstance.post(`entity`, formData, {
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
            .catch(() => {
                navigate("/error")
            });
    };

    const handleCancelNewEntity = () => {
        setNewEntity(null);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className={"home"}>
            {(newEntity === null && entities.length ===0) &&
                <div className={"message"}>
                    <h3>Looks like you haven't saved any of your passwords yet...</h3>
                    <h3>Click on ''New'' and change that, we will do the rest.</h3>
                </div>
            }
            {newEntity !== null && (
                <Entity
                    key="new-entity"
                    entityState={EntityState.CREATE}
                    entityData={newEntity}
                    handleSaveIconClickOnCreate={handleSaveNewEntity}
                    handleCancelIconClick={handleCancelNewEntity}
                />
            )}
            {entities.length > 0 && (
                <div className={"entity-list"}>
                    {entities.map((entity) => (
                        <Entity
                            key={entity.uuid}
                            entityState={entityStates[entity.uuid] || EntityState.VIEW}
                            entityData={entity}
                            handleDeleteIconClick={() => handleDeleteIconClick(entity.name, entity.uuid)}
                            handleUpdateIconClick={() => handleUpdateIconClick(entity.uuid)}
                            handleSaveIconClickOnCreate={(entityData, file) => handleSaveNewEntity(entityData, file)}
                            handleSaveIconClickOnUpdate={(entityData, file, hasChanges) => handleSaveUpdatedEntity(entityData, file, hasChanges)}
                            handleCancelIconClick={() => handleCancelIconClick(entity.uuid)}
                        />
                    ))}
                </div>
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
        </div>
    );
}

export default Home;
