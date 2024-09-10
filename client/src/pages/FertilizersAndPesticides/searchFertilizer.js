import React, { useState } from 'react';
import './SearchFertilizer.css';
import { useNavigate } from 'react-router-dom';
import Farmer from '../../images/fertilizers/farmer.jpeg';


const fertilizers = [
    {
        name: "Yara Mila",
        brand: "EcoGreen",
        amount: "25kg",
        description: "Organic compost is perfect for enriching soil and improving plant health.",
    },
    {
        name: "Nitrogen Pellets",
        brand: "GrowMax",
        amount: "10kg",
        description: "High-quality nitrogen pellets for boosting plant growth.",
    },
    {
        name: "Potash Granules",
        brand: "AgriBest",
        amount: "50kg",
        description: "Potash granules enhance plant root development and increase yield.",
    },
    
];

function SearchFertilizer() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFertilizers, setFilteredFertilizers] = useState(fertilizers);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const filtered = fertilizers.filter(fertilizer =>
            fertilizer.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredFertilizers(filtered);
    };
    const navigate = useNavigate(); 

    return (
        <div className="search-fertilizer-container">
            <button
                type="button"
                className="recommend-button"
                onClick={() => navigate('/recommend')}
            >
                Common Recommendations
            </button>
            
            <h1 className="topic1">Search Fertilizer</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Enter fertilizer name"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <button className="search-button">🔍 Search</button>
            </div>
            <div className='farmer'><img src={Farmer} alt="farmer" /></div>
            <h1 className="topic2">Fertilizers</h1>
            <h1 className="topic3">Organic Fertilizers</h1>
            <div className="fertilizer-results">
                {filteredFertilizers.map((fertilizer, index) => (
                    <div className="fertilizer-item" key={index}>
                        <h2>{fertilizer.name}</h2>
                        <p><strong>Brand:</strong> {fertilizer.brand}</p>
                        <p><strong>Amount:</strong> {fertilizer.amount}</p>
                        <p><strong>Description:</strong> {fertilizer.description}</p>
                        <button className="details-button"  onClick={() => navigate('/details')}>Details</button>

                    </div>
                     
                ))}
            </div>
            <h1 className="topic3">Inorganic Fertilizers</h1>
            <div className="fertilizer-results">
                {filteredFertilizers.map((fertilizer, index) => (
                    <div className="fertilizer-item" key={index}>
                        <h2>{fertilizer.name}</h2>
                        <p><strong>Brand:</strong> {fertilizer.brand}</p>
                        <p><strong>Amount:</strong> {fertilizer.amount}</p>
                        <p><strong>Description:</strong> {fertilizer.description}</p>
                        <button className="details-button">Details</button>

                    </div>
                     
                ))}
            </div>
            <h1 className="topic2">Pesticides</h1>
            <h1 className="topic3">Herbicides</h1>
            <div className="fertilizer-results">
                {filteredFertilizers.map((fertilizer, index) => (
                    <div className="fertilizer-item" key={index}>
                        <h2>{fertilizer.name}</h2>
                        <p><strong>Brand:</strong> {fertilizer.brand}</p>
                        <p><strong>Amount:</strong> {fertilizer.amount}</p>
                        <p><strong>Description:</strong> {fertilizer.description}</p>
                        <button className="details-button">Details</button>

                    </div>
                     
                ))}
            </div>
            <h1 className="topic3">Fungicides</h1>
            <div className="fertilizer-results">
                {filteredFertilizers.map((fertilizer, index) => (
                    <div className="fertilizer-item" key={index}>
                        <h2>{fertilizer.name}</h2>
                        <p><strong>Brand:</strong> {fertilizer.brand}</p>
                        <p><strong>Amount:</strong> {fertilizer.amount}</p>
                        <p><strong>Description:</strong> {fertilizer.description}</p>
                        <button className="details-button">Details</button>

                    </div>
                     
                ))}
            </div>
            <h1 className="topic3">Insecticides</h1>
            <div className="fertilizer-results">
                {filteredFertilizers.map((fertilizer, index) => (
                    <div className="fertilizer-item" key={index}>
                        <h2>{fertilizer.name}</h2>
                        <p><strong>Brand:</strong> {fertilizer.brand}</p>
                        <p><strong>Amount:</strong> {fertilizer.amount}</p>
                        <p><strong>Description:</strong> {fertilizer.description}</p>
                        <button className="details-button">Details</button>

                    </div>
                     
                ))}
            </div>
            
        </div>
    );
}

export default SearchFertilizer;
