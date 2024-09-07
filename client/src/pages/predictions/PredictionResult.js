import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PredictionResult.css';

function PredictionResult() {
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all predictions from the backend
        const fetchPredictions = async () => {
            try {
                const response = await axios.get('http://localhost:5001/prediction/api/predictions');
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
