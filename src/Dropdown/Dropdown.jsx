import React, { useState } from 'react';
import './Dropdown.css';

function Dropdown({ handleDropdownChange }) {
  const [selectedOption, setSelectedOption] = useState('');
  const options = [
    { value: '0', label: 'wham-enhancement' },
    { value: '1', label: 'wham16k-enhancement' },
    { value: '2', label: 'whamr-enhancement' },
    { value: '3', label: 'dns4-16k-enhancement' },
  ];

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    handleDropdownChange(selectedValue);
  };

  // Find the selected option label based on its value
  const selectedOptionLabel = options.find(
    (option) => option.value === selectedOption
  )?.label;

  return (
    <div className='dropdown-container'>
      <select
        className='dropdown-select'
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value='0' disabled>
          wham-enhancement
        </option>{' '}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {selectedOptionLabel && (
        <p className='selected-text'>
          Та {selectedOptionLabel} модел-г сонголоо
        </p>
      )}
    </div>
  );
}

export default Dropdown;
