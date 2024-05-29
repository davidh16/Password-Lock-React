import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Axios from "axios";
import Entity from "../../components/Entity/Entity.jsx";
import CryptoJS from 'crypto-js';

function Home(){

    function decodeBase64(input) {
        return CryptoJS.enc.Base64.parse(input);
    }

    const decryptResponse = (cipherText) => {

        const secret = 'abc&1*~#^2^#s0^=)^^7%b34';
        const iv = '232e39185523184a5723586242200e05';


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
                console.log('Decrypted Response:', decryptedResponse);
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