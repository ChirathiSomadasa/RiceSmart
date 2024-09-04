import React, { useState } from 'react';
import './Predictions.css';
import axios from 'axios';

function Predictions() {
    // State for yield form
    const [yieldData, setYieldData] = useState({ variety: '', estimatedYield: '', yieldVariability: '', geographicLocation: '', historicalData: '', irrigationPractices: '', weatherConditions: '', pestsDiseases: '' });

    // Handler for form inputs
    const handleYieldChange = (e) => {
        setYieldData({ ...yieldData, [e.target.name]: e.target.value });
    };

    // Handler for form submission
    const handleYieldSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/predictions', yieldData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            alert(response.data.message);

            // Reset the form fields after successful submission
            setYieldData({ variety: '', estimatedYield: '', yieldVariability: '', geographicLocation: '', historicalData: '', irrigationPractices: '', weatherConditions: '', pestsDiseases: '' });
        } catch (error) {
            console.error('There was an error submitting the form!', error); // Log the entire error
            console.error('Error details:', error.response?.data || error.message);
            alert('Failed to submit prediction');
        }
    };

    return (
        <div><div className='predic_parallax'>
            <div className='hero_text'>
                <h1>Smart Farming, Better Yields</h1>
            </div>
        </div>
        
            <div className='yiled_data'>

                <div className='instructions'>

                    <div className='instruction_2'>

                        
                    </div>
                    
                </div>
                <div className='yiled_form_container'>
                    <form onSubmit={handleYieldSubmit} className='form'>
                        <h2 className='yield_topic'>YIELD PREDICTION</h2>

                        <label className='yiled_label'>Variety </label><br></br>
                            <input className='input_yiled' type='text' name='variety' value={yieldData.variety} onChange={handleYieldChange} placeholder='Enter Variety' /><br></br>
                        
                        <label className='yiled_label'>Estimated Yield (kg/ha) </label><br></br>
                            <input className='input_yiled' type='text' name='estimatedYield' value={yieldData.estimatedYield} onChange={handleYieldChange} placeholder='Enter Estimated Yield  ' /><br></br>
                        
                        <label className='yiled_label'>Yield Variability (kg/ha)  </label><br></br>
                            <input className='input_yiled' type='text' name='yieldVariability' value={yieldData.yieldVariability} onChange={handleYieldChange} placeholder='Enter Yield Variability' /><br></br>
                        
                        <label className='yiled_label'>Geographic Location </label><br></br>
                            <input className='input_yiled' type='text' name='geographicLocation' value={yieldData.geographicLocation } onChange={handleYieldChange} placeholder='Enter Geographic Location  ' /><br></br>
                        
                        <label className='yiled_label'>Historical Data</label><br></br>
                            <input className='input_yiled' type='text' name='historicalData' value={yieldData.historicalData } onChange={handleYieldChange} placeholder='Enter Historical data' /><br></br>
                        
                            <label className='yiled_label'>Irrigation Practices</label><br></br>
                        <select className='select_yiled' name='irrigationPractices' value={yieldData.irrigationPractices} onChange={handleYieldChange}>
                            <option value=''>Select an option</option>
                            <option value='Drip irrigation'>Drip irrigation</option>
                            <option value='Flood irrigation'>Flood irrigation</option>
                            <option value='Sprinkler irrigation'>Sprinkler irrigation</option>
                            <option value='Surface irrigation'>Surface irrigation</option>
                        </select><br></br>

                        <label className='yiled_label'>Weather Conditions</label><br></br>
                        <select className='select_yiled' name='weatherConditions' value={yieldData.weatherConditions} onChange={handleYieldChange}>
                            <option value=''>Select an option</option>
                            <option value='High rainfall expected'>High rainfall expected</option>
                            <option value='Dry season'>Dry season</option>
                            <option value='Mild temperatures'>Mild temperatures</option>
                            <option value='Strong winds forecasted'>Strong winds forecasted</option>
                        </select><br></br>
                        
                        <label className='yiled_label'>Pests/Diseases </label><br></br>
                            <textarea className='text_yiled' name='pestsDiseases' value={yieldData.pestsDiseases} onChange={handleYieldChange} placeholder='Enter pests/diseases' /><br></br>
                        
                        <button className='yiled_button' type='submit'>SUBMIT</button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Predictions;
