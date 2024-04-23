import React, { useState } from 'react';
import './ToggleSwitch.css'; // Make sure to create a separate CSS file with the provided styles

const ToggleSwitch = () => {
  const [isToggled, setIsToggled] = useState(true);

  const onToggle = () => setIsToggled(!isToggled);

  return (
    <div className="toggle-switch">
      <input
        id="toggle-switch-checkbox"
        type="checkbox"
        checked={isToggled}
        onChange={onToggle}
      />
      <label className="toggle-slider" htmlFor="toggle-switch-checkbox"></label>
      <div className="labels">
        <span className={isToggled ? 'label active' : 'label'}>Adjusted</span>
        <span className={!isToggled ? 'label active' : 'label'}>Original</span>
      </div>
    </div>
  );
};

export default ToggleSwitch;
