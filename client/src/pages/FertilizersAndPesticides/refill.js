import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Refill.css';
import Processing from '../../images/fertilizers/process.gif';
import nodataGif from '../../images/fertilizers/nodata.gif'; 

function Refill() {
  const navigate = useNavigate();
  
    return (
        <div className="detail-container">
            <button
                type="button"
                className="add_button"
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
            <div className="status-container">
              <h2>Your Status</h2>
                <img 
                    className="status-video" 
                    src={nodataGif} 
                    alt="No refill request"
                />
              
                <div className="status-message">
                    You have not submitted any refill request
                </div>
            </div>
        </div>
    );
}

export default Refill;
