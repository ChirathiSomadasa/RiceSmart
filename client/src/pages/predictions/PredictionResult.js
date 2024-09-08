import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PredictionResult.css';
import { useAuthEmail, useAuthPassword } from '../../auth'

function PredictionResult() {

    const authEmail = useAuthEmail();
    const authPassword = useAuthPassword();

    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all predictions from the backend
        const fetchPredictions = async () => {
            try {
                const response = await axios.post('http://localhost:5001/prediction/api/predictions/',{auth_email:authEmail,auth_password:authPassword});

                for(var i = 0; i < response.data.data.length; i++){
                    var item = response.data.data[i];
                    
                    let calculatedStatus = '';
                    let calculatedRecommendation = '';

                    if (item.estimatedYield > 3000 && item.yieldVariability < 10) {
                        calculatedStatus = 'Good';
                        calculatedRecommendation = 'Continue with the current practices.';
                    } else if (item.estimatedYield >= 2000 && item.estimatedYield <= 3000 && item.yieldVariability >= 10) {
                        calculatedStatus = 'Moderate';
                        calculatedRecommendation = 'Consider improving irrigation and monitoring weather conditions.';
                    } else {
                        calculatedStatus = 'Poor';
                        calculatedRecommendation = 'Review agricultural practices, consider new irrigation methods, and prepare for weather variability.';
                    }

                    item.status = calculatedStatus;
                    item.recommendation = calculatedRecommendation;

                }

                console.log(response.data.data);
                
                setPredictions(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load predictions');
                setLoading(false);
            }
        };

        fetchPredictions();
    }, []);

    const handleEdit = (id) => {
        // Redirect to the edit page (you need to implement this page)
        navigate(`/EditResult/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/prediction/api/predictions/${id}`);
            setPredictions(predictions.filter(prediction => prediction._id !== id));
        } catch (err) {
            setError('Failed to delete prediction');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='result'>
            <h1>Prediction Results</h1>
            <div className='filter_bar'>
                <input className='search_bar' placeholder="Search" type="text"/>
                <button className='report_yield'>Generate Report</button>
            </div>
            <div className='result_data'>
                {predictions.length === 0 ? (
                    <p>No prediction results available.</p>
                ) : (
                    predictions.map(prediction => (
                        <div key={prediction._id} className='prediction_card'>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Variety</th>
                                        <td>{prediction.variety}</td>
                                    </tr>
                                    <tr>
                                        <th>Estimated Yield (kg/ha)</th>
                                        <td>{prediction.estimatedYield}</td>
                                    </tr>
                                    <tr>
                                        <th>Yield Variability (kg/ha)</th>
                                        <td>{prediction.yieldVariability}</td>
                                    </tr>
                                    <tr>
                                        <th>Geographic Location</th>
                                        <td>{prediction.geographicLocation}</td>
                                    </tr>
                                    <tr>
                                        <th>Irrigation Practices</th>
                                        <td>{prediction.irrigationPractices}</td>
                                    </tr>
                                    <tr>
                                        <th>Weather Conditions</th>
                                        <td>{prediction.weatherConditions}</td>
                                    </tr>
                                    <tr>
                                        <th>Status</th>
                                        <td>{prediction.status}</td>
                                    </tr>
                                    <tr>
                                        <th>Recommendation</th>
                                        <td>{prediction.recommendation}</td>
                                    </tr>
                                </tbody>
                            </table>
                            
                                
                                <div className='result_div'>Do you want to Edit Yield Prediction Results?<button className='edit_btn' onClick={() => handleEdit(prediction._id)}>Edit</button></div>
                                <div className='result_div'>Do you want to Delete Yield Prediction Results?  <button className='delete_btn' onClick={() => handleDelete(prediction._id)}>Delete</button></div>
                
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}

export default PredictionResult;
