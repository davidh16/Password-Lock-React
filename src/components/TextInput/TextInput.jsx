import "./TextInput.css"
import iconVisible from "../../assets/visible.png"
import iconHidden from "../../assets/hidden.png"
import {useState} from "react";
import PropTypes from "prop-types";
function TextInput({inputDisplay, onChange, value, label, placeholder, type, icon, handleIconClick, error}){

    const [inputType, setInputType] = useState(type)
    const toggleInputType = () =>{
        setInputType(inputType === 'text' ? 'password' : 'text');
    }

    return(
        <>
            <div>
                {error && <p className={"input-error"}>{error}</p>}
                {!inputDisplay && <div className={`text-input ${error ? 'error-border' : ''}`}>
                    {label && <label>{label}</label>}
                    <input type={inputType} placeholder={placeholder}  onChange={e => onChange(e)} value={value}/>
                    {icon && <img src={icon} onClick={handleIconClick} alt={""}/>}
                    {type === "password" && <img src={inputType === 'text' ? iconVisible : iconHidden} onClick={toggleInputType} alt={""}/>}
                </div>}
            </div>

            {inputDisplay && <div className={"text-input-read-only"}>
                <input readOnly={true} type={inputType} placeholder={placeholder}  onChange={e => onChange(e)} value={value}/>
                {icon && <img src={icon} onClick={handleIconClick} alt={""}/>}
                {type === "password" && <img src={inputType === 'text' ? iconVisible : iconHidden} onClick={toggleInputType} alt={""}/>}
            </div>}
        </>

    )
}

TextInput.propTypes = {
    inputDisplay: PropTypes.bool.isRequired,
    value: PropTypes.string,
    icon: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
    handleIconClick: PropTypes.func,
    error: PropTypes.string
};

export default TextInput