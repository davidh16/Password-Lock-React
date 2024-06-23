import {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import "./Dropdown.css"

function Dropdown({ onOptionSelect, initialOption }) {
    const [selectedOption, setSelectedOption] = useState(initialOption);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setSelectedOption(Number(newValue));
        onOptionSelect(Number(newValue));
    };

    useEffect(() => {
        setSelectedOption(initialOption);
    }, [initialOption]);

    return (
        <div className="dropdown-container">
            <select value={selectedOption} onChange={handleChange}>
                <option value="" disabled>Select an option</option>
                <option value={2}>Facebook</option>
                <option value={5}>Instagram</option>
                <option value={1}>GitHub</option>
                <option value={4}>LinkedIn</option>
                <option value={3}>Gmail</option>
                <option value={6}>Custom</option>
            </select>
        </div>
    );
}

Dropdown.propTypes = {
    onOptionSelect: PropTypes.func.isRequired,
    initialOption: PropTypes.number.isRequired,
};

export default Dropdown;
