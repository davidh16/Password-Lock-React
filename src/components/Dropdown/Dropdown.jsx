import { useState } from 'react';
import PropTypes from "prop-types";

function DropdownMenu({ onOptionSelect, initialOption }) {
    const [selectedOption, setSelectedOption] = useState(initialOption);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setSelectedOption(newValue);
        onOptionSelect(newValue);
    };

    return (
        <div className="dropdown-container">
            <select value={selectedOption} onChange={handleChange}>
                <option value="" disabled>Select an option</option>
                <option value="1">Facebook</option>
                <option value="2">Instagram</option>
                <option value="3">GitHub</option>
                <option value="4">LinkedIn</option>
                <option value="5">Gmail</option>
                <option value="6">Custom</option>
            </select>
        </div>
    );
}

DropdownMenu.propTypes = {
    onOptionSelect: PropTypes.func.isRequired,
    initialOption: PropTypes.string.isRequired,  // Adjust the type according to your entity type
};

export default DropdownMenu;
