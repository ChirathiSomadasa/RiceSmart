import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import './Refill.css';
import Fertilizers from '../../images/fertilizers/fertilizers.png';

function Refill() {
    const navigate = useNavigate();
    return (
        <div className="detail-container">
          <div ><img src={Fertilizers} alt="Fertilizers" /></div>
            <button
                type="button"
                className="add-button"
                onClick={() => navigate('/AddDetails')}
            >
              Add Details 
            </button>
            <button
                type="button"
                className="View_button"
                onClick={() => navigate('/view')}
            >
              View Details 
            </button>
            <button
                type="button"
                className="View_button"
                onClick={() => navigate('/')}
            >
              View Status 
            </button>
            </div>
    );
}

export default Refill;
