import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './ProblemForm.css';
import { useAuthEmail, useAuthPassword } from '../../auth'

function AddProblem() {
    const navigate = useNavigate();

    const [contactData, setContactData] = useState([]);
    const [disease, setDisease] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const authEmail = useAuthEmail();
    const authPassword = useAuthPassword();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5001/AddProblem", { disease, description, category, location });
            setSuccessMessage('Problem added successfully!');
            alert('Problem added successfully!!!');
            setDisease('');
            setDescription('');
            setCategory('');
            setLocation('');
            navigate('/contact'); // Redirect after success
        } catch (err) {
            setError('Error adding problem. Please try again.');
            alert('Error adding problem. Please try again.');
        }
    };

    if (authEmail == null || authPassword == null) {
        return ("No login");

    } else {
        return (
            <div className='QAddProblemForm'>
                <div className='Qaddproblem_photo'>
                    <br></br><br></br>
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
                            <select id="productCategory" className="PAinarea" value={category} onChange={(e) => setCategory(e.target.value)} required>
                                <option>Select Category</option>
                                <option>Sowing Season</option>
                                <option>Growing Season</option>
                                <option>Harvesting Season</option>
                                <option>Resting Season</option>
                            </select>
                        </div>
                        <div className="PAform-group">
                            <label>Location:</label>
                            <input type="text" className="PAinarea" placeholder='Enter Location' value={location} onChange={(e) => setLocation(e.target.value)} />
                        </div>
                        <br></br>
                        <button type="submit" className="PAbtn">Submit</button>
                    </form>
                    {error && <p>{error}</p>}
                    {successMessage && <p>{successMessage}</p>}
                </div>
            </div>



        );
    }
}

export default AddProblem;
