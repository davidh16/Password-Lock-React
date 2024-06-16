import { useState } from 'react';
import './Dropdown.css';
import PropTypes from "prop-types";

function DropdownMenu({onOptionSelect}){
    const [selectedOption, setSelectedOption] = useState('custom');
    const handleChange = (event) => {
        const newValue = event.target.value;
        setSelectedOption(newValue);
        onOptionSelect(newValue);
    };
    return (
        <div className="dropdown-container">
            <select value={selectedOption} onChange={handleChange}>
                <option value="" disabled>Select an option</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="github">GitHub</option>
                <option value="linkedin">LinkedIn</option>
                <option value="gmail">Gmail</option>
                <option value="custom">Custom</option>
            </select>
        </div>
    );
}

DropdownMenu.propTypes = {
    onOptionSelect: PropTypes.func.isRequired
};

export default DropdownMenu;
