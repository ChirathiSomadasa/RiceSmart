import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import './UpdateContact.css';
import serviceImage from 'F:/RiceSmart/RiceSmart/client/src/images/Contact/14.jpeg';

function UpdateContact() {
    const navigate = useNavigate();
    const {id} = useParams()

    const [contactData, setContactData] = useState([]);
    const [disease, setDisease] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5001/getContact/${id}`)
            .then(res => {
                const problem = res.data;
                setDisease(problem.disease);
                setDescription(problem.description);
                setCategory(problem.category);
                setLocation(problem.location);
            })
            .catch(err => console.log(err));
            
    }, [id]);
 
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5001/UpdateContact/${id}`, { disease, description, category, location });
            setSuccessMessage('Problem updated successfully!');
            setTimeout(() => navigate('/contact'), 2000); // Redirect after success
        } catch (err) {
            setError('Error updating problem. Please try again.');
        }
    };

    return (
        <div className='QAddProblemForm'>
            <div className='Qaddproblem_photo'>
                <img src={serviceImage} alt="Qaddproblem" />
            </div>
            <div className='QForm'>
                <div className="PAformout">
                    <form className="PAproductForm" onSubmit={handleUpdate}>
                        <h2 className="PAtopic">Update Disease</h2>
                        <div className="PAform-group">
                            <label>Disease:</label>
                            <input type="text" className="PAinarea" value={disease} onChange={(e) => setDisease(e.target.value)} required />
                        </div>
                        <div className="PAform-group">
                            <label>Description:</label>
                            <textarea className="PAinarea" value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </div>
                        <div className="PAform-group">
                            <label>Category:</label>
                            <select id="productCategory" className="PAinarea"  value={category} onChange={(e) => setCategory(e.target.value)} required>
                                 
                                <option>During Harvesting Time</option>
                                <option>During Sowing Time</option>
                                <option>During Crop Cultivation</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="PAform-group">
                            <label>Location:</label>
                            <input type="text" className="PAinarea"  value={location} onChange={(e) => setLocation(e.target.value)} />
                        </div>
                        <button type="submit" className="PAbtn">Update</button>
                    </form>
                    {error && <p>{error}</p>}
                    {successMessage && <p>{successMessage}</p>}
                </div>
            </div>
        </div>

        
    );
}

export default UpdateContact;
