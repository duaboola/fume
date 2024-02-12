// components/DisclaimerPopup.js
import { useState } from 'react';

const DisclaimerPopup = ({ onConfirm }) => {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h6>You need to be 18 and older to view this site?</h6>
        <h6>Are you over 18 years of age?</h6>
        <div class="confirmation">
            <button onClick={handleConfirm}>Yes</button>
            
            <button >No</button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPopup;
