import React, { useState, useEffect } from 'react';
import './Predictions.css';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

function EditResult() {
    const validRiceVarieties = [
        'basmathi', 
        'kurulu thuda', 
        'heenati', 
        'haramas', 
        'rathhal', 
        'maavee',
        'pachchaperumal',
        'red rice', 
        'black rice', 
        'sticky Rice',
        'samba',
        'keeri samba',
        'nadu',
        'kakulu'

    ];

    const [yieldData, setYieldData] = useState({ 
        variety: '', 
        estimatedYield: '', 
        yieldVariability: '', 
        geographicLocation: '', 
        historicalData: '', 
        irrigationPractices: '', 
        weatherConditions: '', 
    });

    const { id } = useParams();
    const [errors, setErrors] = useState({});
    const [resultData, setResultData] = useState(null); // State for status and recommendation
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all predictions from the backend
        const fetchPredictions = async () => {
            try {
                const response = await axios.get('http://localhost:5001/prediction/api/predictions/'+id);

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

                setYieldData(response.data.data);
                
            } catch (err) {
                //setError('Failed to load predictions');
                //setLoading(false);
            }
        };

        fetchPredictions();
    }, []);

    const handleYieldChange = (e) => {
        const { name, value } = e.target;
        let errorMsg = '';

        if (name === 'variety') {
            if (!validRiceVarieties.includes(value)) {
                errorMsg = 'Please enter a valid rice variety';
            }
        } else if (name === 'geographicLocation') {
            if (!/^[a-zA-Z\s]*$/.test(value)) {
                errorMsg = 'Please enter only letters';
            }
        } else if (name === 'estimatedYield' || name === 'yieldVariability') {
            if (!/^\d*$/.test(value)) {
                errorMsg = 'Please enter a valid integer number';
            }
        }

        setYieldData({ ...yieldData, [name]: value });
        setErrors({ ...errors, [name]: errorMsg });
    };

    const handleYieldSubmit = async (e) => {
        e.preventDefault();

        const formErrors = {};
        if (!validRiceVarieties.includes(yieldData.variety)) {
            formErrors.variety = 'Please enter a valid rice variety';
        }
        if (!yieldData.geographicLocation.match(/^[a-zA-Z\s]*$/)) {
            formErrors.geographicLocation = 'Please enter only letters';
        }
        if (!yieldData.estimatedYield.match(/^\d*$/)) {
            formErrors.estimatedYield = 'Please enter a valid integer number';
        }
        if (!yieldData.yieldVariability.match(/^\d*$/)) {
            formErrors.yieldVariability = 'Please enter a valid integer number';
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        // Determine status and recommendation based on input data
        let calculatedStatus = '';
        let calculatedRecommendation = '';

        if (yieldData.estimatedYield > 3000 && yieldData.yieldVariability < 10) {
            calculatedStatus = 'Good';
            calculatedRecommendation = 'Continue with the current practices.';
        } else if (yieldData.estimatedYield >= 2000 && yieldData.estimatedYield <= 3000 && yieldData.yieldVariability >= 10) {
            calculatedStatus = 'Moderate';
            calculatedRecommendation = 'Consider improving irrigation and monitoring weather conditions.';
        } else {
            calculatedStatus = 'Poor';
            calculatedRecommendation = 'Review agricultural practices, consider new irrigation methods, and prepare for weather variability.';
        }

        // Combine all data to pass to the results page
        const resultData = {
            ...yieldData,
            status: calculatedStatus,
            recommendation: calculatedRecommendation
        };

        try {
            await axios.post('http://localhost:5001/prediction/api/predictions/'+id, yieldData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setResultData(resultData);
            console.log('Result Data:', resultData);

        } catch (error) {
            console.error('Error during form submission:', error);
            alert('Failed to submit prediction');
        }
    };

    const handleOkClick = () => {
        if (resultData) {
            console.log('Navigating with result data:', resultData);
            navigate('/predictionResult', { state: resultData });
        }
    };

    return (
        <div>
            <div className='predic_parallax'>
                <div className='hero_text'>
                    <h1>Smart Farming, Better Yields</h1>
                </div>
            </div>
        
            <div className='yiled_data'>
                <div className='instructions'>
                    <div className='instruction_2'>
                        <h1>Follow the instructions below to fill the form</h1>

                        <h4>1. Variety (Type of Rice)</h4>
                            <ul>
                                <li><p><b>What to do: </b>Enter the name of the rice variety you're growing.</p></li>
                                <li><p><b>Valid options: </b>You can use these types.</p><p>basmathi, kurulu thuda, heenati, haramas, rathhal,maavee,pachchaperumal, red Rice, black Rice, Sticky Rice, Samba, Keeri Samba, Nadu, Kakulu.</p></li>
                                <li><p><b>Example: </b>If you are growing Samba rice, enter "Samba".</p></li>
                            </ul>
                        

                       
                            <h4>2. Estimated Yield (kg/ha)</h4>
                            <ul>
                                <li><p><b>What to do: </b>Enter the expected yield of rice in kilograms per hectare based on your current estimate.</p></li>
                                <li><p><b>Format: </b>Only enter whole numbers.</p></li>
                                <li><p><b>Example: </b>If you expect 3000 kg/ha, enter "3000".</p></li>
                            </ul>
                        
                       
                            <h4>3. Yield Variability (kg/ha)</h4>
                            <ul>
                                <li><p><b>What to do: </b>Enter the variability in your estimated yield, which indicates how much fluctuation you expect in the yield.</p></li>
                                <li><p><b>Format: </b> Only enter whole numbers.</p></li>
                                <li><p><b>Example: </b>If your yield could fluctuate by 200 kg/ha, enter "200".</p></li>
                            </ul>
                        

                       
                            <h4>4. Geographic Location</h4>
                            <ul>
                                <li><p><b>What to do: </b> Enter the name of your location or the area where your farm is located.</p></li>
                                <li><p><b>Format: </b> Only use letters (A-Z) and spaces; no numbers or special characters are allowed.</p></li>
                                <li><p><b>Example: </b>If your farm is located in Kurunegala, enter "Kurunegala".</p></li>
                            </ul>

                            
                            <h4>5. Irrigation Practices</h4>
                            <ul>
                                <li><p><b>What to do: </b> Select the irrigation method you are currently using on your farm.</p></li>
                                <li><p><b>Options: </b> Drip irrigation, Flood irrigation, Sprinkler irrigation, Surface irrigation</p></li>
                                <li><p><b>Example: </b>If you're using a sprinkler system to irrigate, select "Sprinkler irrigation" from the dropdown.</p></li>
                            </ul>

                            <h4>6. Weather Conditions</h4>
                            <ul>
                                <li><p><b>What to do: </b>  Select the type of weather conditions expected during your farming season.</p></li>
                                <li><p><b>Options: </b> High rainfall expected, Dry season, Mild temperatures, Strong winds forecasted</p></li>
                                <li><p><b>Example: </b>If you expect high rainfall, choose "High rainfall expected" from the list.</p></li>
                            </ul>
                       
                    </div>
                </div>
                <div className='yiled_form_container'>
                    <form onSubmit={handleYieldSubmit} className='form'>
                        <h2 className='yield_topic'>YIELD PREDICTION</h2>

                        <label className='yiled_label'>Variety </label><br />
                        <input 
                            className='input_yiled' 
                            type='text' 
                            name='variety' 
                            value={yieldData.variety} 
                            onChange={handleYieldChange} 
                            placeholder='Enter Variety' 
                            required
                        />
                        {errors.variety && <div className='error_message'>{errors.variety}</div>}
                        <br />
                        
                        <label className='yiled_label'>Estimated Yield (kg/ha) </label><br />
                        <input 
                            className='input_yiled' 
                            type='text' 
                            name='estimatedYield' 
                            value={yieldData.estimatedYield} 
                            onChange={handleYieldChange} 
                            placeholder='Enter Estimated Yield' 
                            required
                        />
                        {errors.estimatedYield && <div className='error_message'>{errors.estimatedYield}</div>}
                        <br />
                        
                        <label className='yiled_label'>Yield Variability (kg/ha)  </label><br />
                        <input 
                            className='input_yiled' 
                            type='text' 
                            name='yieldVariability' 
                            value={yieldData.yieldVariability} 
                            onChange={handleYieldChange} 
                            placeholder='Enter Yield Variability' 
                            required
                        />
                        {errors.yieldVariability && <div className='error_message'>{errors.yieldVariability}</div>}
                        <br />
                        
                        <label className='yiled_label'>Geographic Location </label><br />
                        <input 
                            className='input_yiled' 
                            type='text' 
                            name='geographicLocation' 
                            value={yieldData.geographicLocation} 
                            onChange={handleYieldChange} 
                            placeholder='Enter Geographic Location' 
                            required
                        />
                        {errors.geographicLocation && <div className='error_message'>{errors.geographicLocation}</div>}
                        <br />
                        
                        <label className='yiled_label'>Irrigation Practices</label><br />
                        <select 
                            className='select_yiled' 
                            name='irrigationPractices' 
                            value={yieldData.irrigationPractices} 
                            onChange={handleYieldChange} 
                            required
                        >
                            <option value=''>Select an option</option>
                            <option value='Drip irrigation'>Drip irrigation</option>
                            <option value='Flood irrigation'>Flood irrigation</option>
                            <option value='Sprinkler irrigation'>Sprinkler irrigation</option>
                            <option value='Surface irrigation'>Surface irrigation</option>
                        </select>
                        <br />
                        
                        <label className='yiled_label'>Weather Conditions</label><br />
                        <select 
                            className='select_yiled' 
                            name='weatherConditions' 
                            value={yieldData.weatherConditions} 
                            onChange={handleYieldChange} 
                            required
                        >
                            <option value=''>Select an option</option>
                            <option value='High rainfall expected'>High rainfall expected</option>
                            <option value='Dry season'>Dry season</option>
                            <option value='Mild temperatures'>Mild temperatures</option>
                            <option value='Strong winds forecasted'>Strong winds forecasted</option>
                        </select>
                        <br />
                        
                        <button className='yiled_button' type='submit'>SUBMIT</button>

                    </form>

                    {resultData && (
                        <div className='result_display'>
                            <h3>Status: {resultData.status}</h3>
                            <p>Recommendation: {resultData.recommendation}</p>
                            <div className='result_btn'><button className='ok_button' onClick={handleOkClick}>OK</button></div>
                        </div>
                    )}
                    
                </div>
            </div>
        </div>
    );

}

export default EditResult;
