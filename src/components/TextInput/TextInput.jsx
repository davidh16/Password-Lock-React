import "./TextInput.css"
import iconVisible from "../../assets/visible.png"
import iconHidden from "../../assets/hidden.png"
import {useState} from "react";
import PropTypes from "prop-types";
function TextInput({onChange, value, label, placeholder, type, icon, id}){

    const [inputType, setInputType] = useState(type)
    const [inputIcon, setInputIcon ] = useState(icon)
    const togleInputType = () =>{
        setInputType(inputType === 'text' ? 'password' : 'text');
        setInputIcon(inputIcon === iconVisible ? iconHidden : iconVisible);
    }

    return(
        <div className={"text-input"}>
            {label && <label>{label}</label>}
            <input type={inputType} placeholder={placeholder} id={id} onChange={e => onChange(e)} value={value}/>
            {icon && <img id={"icon"} src={inputIcon} onClick={togleInputType} alt={""}/>}
        </div>
    )
}

TextInput.propTypes = {
    value: PropTypes.string,
    icon: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
};

export default TextInput