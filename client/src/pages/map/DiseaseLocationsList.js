import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DiseaseLocationsList = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch disease locations from the backend
    useEffect(() => {
        const fetchLocations = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/disease_locations'); // Adjust the API endpoint if needed

            setLocations(response.data);  // Store fetched locations
            setLoading(false);
            console.log(setLocations);

        } catch (err) {
            console.error(err);
            setError('Errorrrrrrr fetching locations');
            setLoading(false);
        }
        };

        fetchLocations();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (

        <div>
        <h2>Disease Locations</h2>
        <ul>
            {locations.map((location, index) => (
            <li key={index} style={{padding: '10px'}}>
                <strong>Disease:</strong> {location.disease}<br />
                <strong>Category:</strong> {location.category}<br />
                <strong>Location:</strong> {location.location}
            </li>
            ))}
        </ul>
        </div>
        
    );
};

export default DiseaseLocationsList;
