import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Axios from "axios";
import Entity from "../../components/Entity/Entity.jsx";
import CryptoJS from 'crypto-js';
import "./Home.css"

const secret = import.meta.env.VITE_RESPONSE_SECRET_KEY;
const iv = import.meta.env.VITE_RESPONSE_SECRET_VECTOR;

function Home(){
    function decodeBase64(input) {
        return CryptoJS.enc.Base64.parse(input);
    }
    const decryptResponse = (cipherText) => {
        const key = CryptoJS.enc.Utf8.parse(secret);
        const iv1 = CryptoJS.enc.Hex.parse(iv);

        const decrypted = CryptoJS.AES.decrypt({
            ciphertext: decodeBase64(cipherText.data)
        }, key, {
            iv: iv1,
            mode: CryptoJS.mode.CFB,
            padding: CryptoJS.pad.NoPadding
        });

        return CryptoJS.enc.Utf8.stringify(decrypted);
    };

    const [entities, setEntities] = useState([]);

    const navigate = useNavigate()

    const handleNew = () => {
       navigate("/create-or-update-entity")
    };

    const handleLogout = () =>{
        Axios.post("http://localhost:8085/logout", undefined,{withCredentials: true})
            .then(() => {
               navigate("/")
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        Axios.get("http://localhost:8085/entity/list", {withCredentials: true})
            .then((response) => {
                const decryptedResponse = decryptResponse(response);
                setEntities(JSON.parse(decryptedResponse).entities)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleDelete = (uuid) => {
        // Filter out the deleted entity from the entities list
        const updatedEntities = entities.filter(entity => entity.uuid !== uuid);
        setEntities(updatedEntities);
    };

    return(
        <>
            {entities && (
                <div className={"entity-list"}>
                    {entities.map((entity) => (
                        <Entity
                            key={entity.uuid}
                            name={entity.name}
                            iconPath={entity.icon_path}
                            password={entity.password}
                            emailAddress={entity.email_address}
                            username={entity.username}
                            description={entity.description}
                            uuid={entity.uuid}
                            onDelete={handleDelete}
                            type={entity.type}
                        />
                    ))}
                </div>
            )}
            <div className={"button-section"}>
                <button onClick={handleNew} className="create-button">New</button>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
        </>
    )
}

export default Home
