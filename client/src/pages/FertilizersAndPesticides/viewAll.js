import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './viewAll.css';

function ViewAll() {
    const navigate = useNavigate();
    const [details, setDetails] = useState([]);

    // Fetch details from the server
    const fetchDetails = async () => {
        try {
            const response = await axios.get("http://localhost:5001/getdetails");
            setDetails(response.data);
        } catch (error) {
            console.error("Error fetching details:", error);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    // Handle edit navigation
    const handleEdit = (id) => {
        navigate(`/editDetails/${id}`);
    };


    // Handle delete
    const handleDelete = async (id) => {
      // Ask the user for confirmation
      const isConfirmed = window.confirm("Are you sure you want to delete this detail?");
      
      if (isConfirmed) {
          try {
              // Perform the delete request
              await axios.delete(`http://localhost:5001/details/${id}`);
              fetchDetails(); // Refresh the details list
              alert("Detail deleted successfully!"); // Notify the user
          } catch (error) {
              console.error("Error deleting detail:", error);
              alert("An error occurred while deleting the detail.");
          }
      } else {
          // User canceled the delete action
          alert("Deletion canceled.");
      }
  };
  
  

    return (
        <div className="view-all">
            <button
                type="button"
                className="add-button"
                onClick={() => navigate('/addDetails')}
            >
                Add Details
            </button>

            <h1 className="topic">All Details</h1>
            <table className="detail-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Product Type</th>
                        <th>Product Name</th>
                        <th>Brand</th>
                        <th>Amount</th>
                        <th>Total Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {details.map((detail, index) => (
                        <tr key={detail._id}>
                            <td>{index + 1}</td> 
                            <td>{detail.phoneNumber}</td>
                            <td>{detail.address}</td>
                            <td>{detail.productType}</td>
                            <td>{detail.productName}</td>
                            <td>{detail.brand}</td>
                            <td>{detail.amount}</td>
                            <td>{detail.price}</td>
                            <td>
                              
                                <button className="action-button delete" onClick={() => handleDelete(detail._id)}>Delete</button>
                                <button className="action-button edit" onClick={() => handleEdit(detail._id)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewAll;
