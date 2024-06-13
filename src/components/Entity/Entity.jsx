import {useEffect, useState} from 'react';
import './Entity.css';
import PropTypes from "prop-types";
import Axios from "axios";
import CryptoJS from "crypto-js";
import iconVisible from "../../assets/visible.png"
import iconHidden from "../../assets/hidden.png"
import copyIcon from "../../assets/copy.png"
import updateEntityIcon from "../../assets/edit.png"
import deleteEntityIcon from "../../assets/delete.png"

const secret = import.meta.env.VITE_RESPONSE_SECRET_KEY;
const iv = import.meta.env.VITE_RESPONSE_SECRET_VECTOR;

function Entity({ name, emailAddress, username,password, description, iconPath, uuid}) {
    const [icon, setIcon] = useState()

    const [viewIcon, setViewIcon] = useState(iconHidden)

    const defaultShownPassword = "••••••••••••••••"

    const [shownPassword, setShownPassword] = useState(defaultShownPassword)

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

    function togglePasswordViewType(){
        if (shownPassword === defaultShownPassword){
            setViewIcon(iconVisible)
            setShownPassword(password)
        }else {
            setViewIcon(iconHidden)
            setShownPassword(defaultShownPassword)
        }
    }

    function copyPassword(){
        navigator.clipboard.writeText(password).then(() => {
            alert("Text copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text: ", err);
        });
    }

    useEffect(() => {
        Axios.get("http://localhost:8085/icon/" + uuid, {withCredentials: true})
            .then((response) => {
                const decryptedResponse = JSON.parse(decryptResponse(response));
                setIcon(decryptedResponse.signed_url)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
        <div className={"entity-container"}>
            <div className={"entity"}>
                {iconPath !== "" && <div className={"icon-column"}>
                    <h3>{name}</h3>
                    <img src={icon} className={"entity-icon"}/>
                    <div className="entity-hover-icons">
                        <img src={updateEntityIcon} alt="Icon 1" className="update-icon"/>
                        <img src={deleteEntityIcon} alt="Icon 2" className="delete-icon"/>
                    </div>
                </div>}
                <div className={"entity-data"}>
                    <label>Password :</label>
                    <div className={"password-field"}>
                        {shownPassword}
                        <div className={"password-buttons"}>
                            <img className={"password-visibility-icon"} src={viewIcon} onClick={togglePasswordViewType} alt={""}/>
                            <img className={"copy-icon"} src={copyIcon} onClick={copyPassword} alt={""}/>
                        </div>
                    </div>
                    <label>Description :</label>
                    <div className={"description-field"}>
                        {description}
                    </div>
                    {emailAddress && <>
                        <label>Email address :</label>
                        <div className={"email-address-field"}>
                            {emailAddress}
                        </div>
                    </>}
                    {username && <>
                        <label>Username :</label>
                        <div className={"username-field"}>
                            {username}
                        </div>
                    </>}
                </div>
            </div>
        </div>
    </>
    );
}

Entity.propTypes = {
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    emailAddress: PropTypes.string,
    username: PropTypes.string,
    description: PropTypes.string.isRequired,
    iconPath: PropTypes.string,
    uuid: PropTypes.string.isRequired,
};
export default Entity;
