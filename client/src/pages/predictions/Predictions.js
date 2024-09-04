import React, { useState } from 'react';
import './Predictions.css';
import axios from 'axios';

function Predictions() {
    // List of valid rice varieties
    const validRiceVarieties = [
        'basmati', 
        'jasmine', 
        'arborio', 
        'carnaroli', 
        'sona masoori', 
        'red rice', 
        'black rice', 
        'sticky Rice',
        'samba',
        'keeri samba',
        'nadu',
        'kakulu'
        // Add more varieties as needed
    ];

    // State for yield form
    const [yieldData, setYieldData] = useState({ 
        variety: '', 
        estimatedYield: '', 
        yieldVariability: '', 
        geographicLocation: '', 
        historicalData: '', 
        irrigationPractices: '', 
        weatherConditions: '', 
       
    });

    // State for error messages
    const [errors, setErrors] = useState({});

    // Handler for form inputs with validation
    const handleYieldChange = (e) => {
        const { name, value } = e.target;
        let errorMsg = '';

        // Validation logic
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

    // Handler for form submission
    const handleYieldSubmit = async (e) => {
        e.preventDefault();

        // Validate before submission
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

        try {
            const response = await axios.post('http://localhost:5001/api/predictions', yieldData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            alert(response.data.message);

            // Reset the form fields after successful submission
            setYieldData({ 
                variety: '', 
                estimatedYield: '', 
                yieldVariability: '', 
                geographicLocation: '', 
                historicalData: '', 
                irrigationPractices: '', 
                weatherConditions: '', 
               
            });
            setErrors({});
        } catch (error) {
            console.error('There was an error submitting the form!', error); // Log the entire error
            console.error('Error details:', error.response?.data || error.message);
            alert('Failed to submit prediction');
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
                </div>
            </div>
        </div>
    );
}

export default Predictions;
