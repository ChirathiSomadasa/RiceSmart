import React, { useEffect, useState } from 'react';
import './Prediction.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Predictions() {
    const [predictions, setPredictions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPredictionData, setFilteredPredictionData] = useState([]);

    const navigate = useNavigate();

    
    useEffect(() => {
        axios.get("http://localhost:5001/api/admin/predictions")
            .then((response) => {
                const { data, status } = response.data;
                if (status === "success") {
                    setPredictions(data);
                    setFilteredPredictionData(data);
                } else {
                    alert("Error - " + response.data.message);
                }
            })
            .catch((error) => {
                alert("Error fetching predictions: " + error.message);
            });
    }, [navigate]);

    
    const handleSearch = () => {
        const filtered = predictions.filter((prediction) =>
            prediction.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prediction.user_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPredictionData(filtered);
    };

    return (
        <div className="prediction-list-container">
            <h1>Manage Yield Predictions</h1>
            <div className='prediction-filter-bar'>
                <input
                    className='prediction-filter-search'
                    placeholder="Search prediction"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className='prediction-filter-search-btn' onClick={handleSearch}>Search</button>
                <button className='generate_report_appbtn'>Generate Report</button>
                <button className='generate_creport_btn'>Generate Current Report</button>
            </div>

            <table className="prediction-table">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Variety</th>
                        <th>Estimated Yield</th>
                        <th>Yield Variability</th>
                        <th>Geographic Location</th>
                        <th>Irrigation Practices</th>
                        <th>Weather Conditions</th>
                        <th>Status</th>
                        <th>Recommendation</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPredictionData.map((prediction, index) => (
                        <tr key={index}>
                            <td>{prediction.user_name}</td>
                            <td>{prediction.variety}</td>
                            <td>{prediction.estimated_yield}</td>
                            <td>{prediction.yield_variability}</td>
                            <td>{prediction.geographicLocation}</td>
                            <td>{prediction.irrigationPractices}</td>
                            <td>{prediction.weatherConditions}</td>
                            <td>{prediction.status}</td>
                            <td>{prediction.recommendation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Predictions;
