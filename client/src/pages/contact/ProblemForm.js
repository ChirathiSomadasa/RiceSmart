import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './ProblemForm.css';
import serviceImage from 'F:/RiceSmart/RiceSmart/client/src/images/Contact/14.jpeg';

function AddProblem() {
    const navigate = useNavigate();

    const [problemData, setProblemData] = useState([]);
    const [disease, setDisease] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {

        axios.post("http://localhost:5000/contact/get", {}).then((response) => {
          var data = response.data;
          setProblemData(data);
        });
      
      },[]);
 
    const handleSubmit = async (e) => {
        e.preventDefault();

        const QformData = {
            disease,
            description,
            category,
            location
        };

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
    };

    return (
        <div className='QAddProblemForm'>
            <div className='Qaddproblem_photo'>
                <img src={serviceImage} alt="Qaddproblem" />
            </div>
            <div className='QForm'>
                <div className="PAformout">
                    <form className="PAproductForm" onSubmit={handleSubmit}>
                        <h2 className="PAtopic">Add Problem</h2>
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
                            <select id="productCategory" className="PAinarea" value={category} onChange={(e) => setCategory(e.target.value)} required>
                                 
                                <option>During Harvesting Time</option>
                                <option>During Sowing Time</option>
                                <option>During Crop Cultivation</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="PAform-group">
                            <label>Location:</label>
                            <input type="text" className="PAinarea" value={location} onChange={(e) => setLocation(e.target.value)} />
                        </div>
                        <button type="submit" className="PAbtn">Submit</button>
                    </form>
                    {error && <p>{error}</p>}
                    {successMessage && <p>{successMessage}</p>}
                </div>
            </div>
            <div class="QuestionList">
                {problemData.map((result) =>
                  
                  <div key={result._id} className="gallery">
                  
                    <div class="Sdetails">
                    <p>{result.disease}</p>
                    <p>{result.description}</p>
                    <p>{result.category}</p>
                    <p>{result.location}</p>

                    </div>
                    
                    
                  </div>

                )}
                </div>
        </div>

        
    );
}

export default AddProblem;
