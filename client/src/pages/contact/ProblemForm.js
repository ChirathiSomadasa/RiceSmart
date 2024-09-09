import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './ProblemForm.css';
import serviceImage from 'F:/RiceSmart/RiceSmart/client/src/images/Contact/14.jpeg';

function AddProblem() {
    const navigate = useNavigate();

    const [contactData, setContactData] = useState([]);
    const [disease, setDisease] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5001/AddProblem", { disease, description, category, location });
            setSuccessMessage('Problem added successfully!');
            setDisease('');
            setDescription('');
            setCategory('');
            setLocation('');
            setTimeout(() => navigate('/contact'), 2000); // Redirect after success
        } catch (err) {
            setError('Error adding problem. Please try again.');
        }
    };
        /*
        try {
            const response = await axios.post("http://localhost:3000/contact/add", QformData);
            if (response.data.status === "success") {
                setSuccessMessage('Problem added successfully!');
                setDisease('');
                setDescription('');
                setCategory('');
                setLocation('');
                navigate('/contact');  // Redirect to the contact page to see the added problem
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError("Error adding problem. Please try again.");
        }
            */


    return (
        <div className='QAddProblemForm'>
            <div className='Qaddproblem_photo'>
                <img src={serviceImage} alt="Qaddproblem" />
            </div>
            <div className='QForm'>
                <div className="PAformout">
                    <form className="PAproductForm" onSubmit={handleSubmit}>
                        <h2 className="PAtopic">Add Disease</h2>
                        <div className="PAform-group">
                            <label>Disease:</label>
                            <input type="text" className="PAinarea" placeholder='Enter Disease' value={disease} onChange={(e) => setDisease(e.target.value)} required />
                        </div>
                        <div className="PAform-group">
                            <label>Description:</label>
                            <textarea className="PAinarea" placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </div>
                        <div className="PAform-group">
                            <label>Category:</label>
                            <select id="productCategory" className="PAinarea" placeholder='Select Category' value={category} onChange={(e) => setCategory(e.target.value)} required>
                                 
                                <option>During Harvesting Time</option>
                                <option>During Sowing Time</option>
                                <option>During Crop Cultivation</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="PAform-group">
                            <label>Location:</label>
                            <input type="text" className="PAinarea" placeholder='Enter Location' value={location} onChange={(e) => setLocation(e.target.value)} />
                        </div>
                        <button type="submit" className="PAbtn">Submit</button>
                    </form>
                    {error && <p>{error}</p>}
                    {successMessage && <p>{successMessage}</p>}
                </div>
            </div>
        </div>

        
    );
}

export default AddProblem;
