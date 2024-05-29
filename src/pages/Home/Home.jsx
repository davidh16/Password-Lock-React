import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Axios from "axios";
import Entity from "../../components/Entity/Entity.jsx";
import CryptoJS from 'crypto-js';

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

    return(
        <>
            {entities && (
                <div>
                    {entities.map((entity) => (
                        <Entity
                            key={entity.uuid}
                            name={entity.name}
                            iconPath={entity.icon_path}
                            password={entity.password}
                            emailAddress={entity.email_address}
                            username={entity.username}
                            description={entity.description}
                        />
                    ))}
                </div>
            )}
        </>

    )
}

export default Home