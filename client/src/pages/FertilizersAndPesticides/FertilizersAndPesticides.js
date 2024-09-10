import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './FertilizersAndPesticides.css';
import yaraMilaImage from '../../images/fertilizers/yaraMila.jpg';

const fertilizers = [
    {
        name: "Yara Mila",
        description: "A balanced fertilizer blend that provides essential nutrients like nitrogen, phosphorus, and potassium, promoting healthy growth and high yields in paddy fields.",
        image: yaraMilaImage


    },
    {
        name: "Urea Fertilizer",
        description: "Urea fertilizer provides essential nitrogen for lush, green growth.",
        image: yaraMilaImage
    },
    {
        name: "Bone Meal",
        description: "Bone meal is a great source of phosphorus for flowering plants.",
        image: yaraMilaImage
    },
    {
        name: "Potassium Sulfate",
        description: "Potassium sulfate enhances root development and disease resistance.",
        image: yaraMilaImage
    },
    {
        name: "NPK Granular",
        description: "NPK fertilizer provides a balanced mix of nutrients for all plants.",
        image: yaraMilaImage
    },
    {
        name: "Seaweed Extract",
        description: "Seaweed extract boosts growth and improves stress tolerance in plants.",
        image: yaraMilaImage
    },
];


function FertilizersAndPesticides() {
    
    const [activeItem, setActiveItem] = useState(null);
    const longPressTimeout = useRef(null);
    
        const handleLongPressStart = (index) => {
            longPressTimeout.current = setTimeout(() => {
                setActiveItem(index);
            }, 500); // Adjust this duration for the long press timing
        };
    
        const handleLongPressEnd = () => {
            clearTimeout(longPressTimeout.current);
            setActiveItem(null);
        };
  
        const navigate = useNavigate(); 
    
        // Functions for navigation
        function onSearchButtonClick() {
            navigate("/searchFertilizer");
        }
    
        function onRefillButtonClick() {
            navigate("/refill");
        }
    
        function onDisposalButtonClick() {
            navigate("/disposal");
        }
    return (
        
        <div className="fertilizer-container">
               <div className="action-buttons">
                <button className="search-button" onClick={onSearchButtonClick}>Search Fertilizer or Pesticides</button>
                <button className="refill-button" onClick={onRefillButtonClick}>Refill</button>
                <button className="disposal-button" onClick={onDisposalButtonClick}>Disposal</button>
            </div>
            <h1>Fertilizers List</h1>
            <div className="fertilizer-list">
                {fertilizers.map((fertilizer, index) => (
                    <div
                        className={`fertilizer-item ${activeItem === index ? 'enlarged' : ''}`}
                        key={index}
                        onTouchStart={() => handleLongPressStart(index)}
                        onTouchEnd={handleLongPressEnd}
                        onMouseDown={() => handleLongPressStart(index)}
                        onMouseUp={handleLongPressEnd}
                        onMouseLeave={handleLongPressEnd}
                    >
                        <img src={fertilizer.image} alt={fertilizer.name} />
                        <h2>{fertilizer.name}</h2>
                        <p>{fertilizer.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FertilizersAndPesticides;
