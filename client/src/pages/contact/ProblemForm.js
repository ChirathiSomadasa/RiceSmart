import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './ProblemForm.css'
 

function AddProblem() {

    var navigate = useNavigate();

    const [disease, setDisease] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('disease',disease);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('location', location);
        

            axios.post("http://localhost:5000/product/add", formData).then((response) => {

                var data = response.data;
                var status = data.status;
                if (status == "success") {
                   
                    alert("Problem added successfully!!.")
                    setSuccessMessage('Problem added successfully!');
                    // Clear form fields after successful submission
                    setDisease('');
                    setDescription('');
                    setCategory('');
                    setLocation('');

                } else {
                    var message = data.message;
                    alert("Error - " + message);
                }

            }).catch((error) => {
                alert("Error 2 - " + error);
            });

    };

    return (
        <div class="PAformout">
            <h2 class="PAtopic">Add Problem</h2>
            <form class="PAproductForm" onSubmit={handleSubmit}>
                <div className="PAform-group">
                    <label>Disease:</label>
                    <input type="text" class="PAinarea" value={disease} onChange={(e) => setDisease(e.target.value)} required />
                </div>
                <div className="PAform-group">
                    <label>Description:</label>
                    <input type="text" class="PAinarea" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                </div>
                <div className="PAform-group">
                    <label>Category:</label>
                     <select id="productCategory" class="PAinarea" value={category} onChange={(e) => setCategory(e.target.value)} required>

                     <option>Select Category</option>
                        <option>During Harvesting Time</option>
                        <option>During Sowing Time  </option>
                        <option>During Crop Cultivation</option>
                        <option>Other</option>

                    </select>
                </div>
                <div className="PAform-group">
                    <label>Location:</label>
                    <input type="text" class="PAinarea" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                 
                <button type="submit" class="PAbtn">Submit</button>
            </form>
            {error && <p>{error}</p>}
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
}

export default AddProblem;
