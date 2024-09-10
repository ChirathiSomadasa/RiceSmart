import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios to make HTTP requests
import './addDetails.css';

function EditDetails() {
    const [detail, setDetail] = useState({
    
        address: "",
        phoneNumber: "",
        productType: "",
        productName: "",
        brand: "",
        amount: "",
        price: ""
    });

    const [originalDetail, setOriginalDetail] = useState({});
    const [errors, setErrors] = useState({});

    const { id } = useParams(); // Get the ID from URL params
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the current details using the ID
        const fetchData = async () => {
            try {
                const response = await axios.get(`/getdetails/${id}`); 
                setDetail(response.data);
                setOriginalDetail(response.data); // Store the original data
            } catch (error) {
                console.error('Error fetching details:', error);
            }
        };

        fetchData();
    }, [id]);

    const validateField = (name, value) => {
        const newErrors = { ...errors };

        switch (name) {

            case 'phoneNumber':
                if (!value) newErrors.phoneNumber = "Phone Number is required.";
                else if (!/^\d{10}$/.test(value)) newErrors.phoneNumber = "Phone Number must be exactly 10 digits.";
                else delete newErrors.phoneNumber;
                break;

            case 'address':
                if (!value) newErrors.address = "Address is required.";
                else delete newErrors.address;
                break;

            case 'productType':
                if (!value) newErrors.productType = "Product Type is required.";
                else delete newErrors.productType;
                break;

            case 'productName':
                if (!value) newErrors.productName = "Product Name is required.";
                else delete newErrors.productName;
                break;

            case 'brand':
                if (!value) newErrors.brand = "Brand is required.";
                else if (!/^[a-zA-Z]+$/.test(value)) newErrors.brand = "Brand can only contain letters.";
                else delete newErrors.brand;
                break;

            case 'amount':
                if (!value) newErrors.amount = "Amount is required.";
                else if (!/^\d+$/.test(value)) newErrors.amount = "Amount can only contain numbers.";
                else delete newErrors.amount;
                break;

            case 'price':
                if (!value) newErrors.price = "Price is required.";
                else delete newErrors.price;
                break;

            default:
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        setDetail(prevState => ({
            ...prevState,
            [name]: value
        }));
        validateField(name, value); // Validate field on change
    };

    const validateForm = () => {
        const newErrors = {};

        if (!detail.phoneNumber) newErrors.phoneNumber = "Phone Number is required.";
        if (!/^\d{10}$/.test(detail.phoneNumber)) newErrors.phoneNumber = "Phone Number must be exactly 10 digits.";

        if (!detail.address) newErrors.address = "Address is required.";

        if (!detail.productType) newErrors.productType = "Product Type is required.";

        if (!detail.productName) newErrors.productName = "Product Name is required.";

        if (!detail.brand) newErrors.brand = "Brand is required.";
        if (!/^[a-zA-Z]+$/.test(detail.brand)) newErrors.brand = "Brand can only contain letters.";

        if (!detail.amount) newErrors.amount = "Amount is required.";
        if (!/^\d+$/.test(detail.amount)) newErrors.amount = "Amount can only contain numbers.";

        if (!detail.price) newErrors.price = "Price is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (validateForm()) {
            // Check if any changes have been made
            const hasChanges = JSON.stringify(detail) !== JSON.stringify(originalDetail);

            if (hasChanges) {
                try {
                    await axios.put(`/editDetails/${id}`, detail); // Adjust the URL according to your backend route
                    alert("Refill request details updated successfully");
                    navigate('/'); // Redirect after successful update
                } catch (error) {
                    console.error('Error updating details:', error);
                    alert('An error occurred while updating details');
                }
            } else {
                alert('No changes were made');
            }
        } else {
            alert('Please fix the errors in the form');
        }
    };

    return (
        <div className="refill-request-container">
            <h1 className="refill">Edit Details</h1>

            <form onSubmit={handleSubmit} className="details-form">
                <div className="refill-form">
                    <div className="form-column">
                        <h2>User Details</h2>
                        <div className="form-group">
                            <label>Phone Number:</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={detail.phoneNumber}
                                onChange={handleInputChange}
                                className="input-field"
                                placeholder="Enter Phone Number"
                            />
                            {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
                        </div>
                        <div className="form-group">
                            <label>Address:</label>
                            <input
                                type="text"
                                name="address"
                                value={detail.address}
                                onChange={handleInputChange}
                                className="input-field"
                                placeholder="Enter Address"
                            />
                            {errors.address && <span className="error-text">{errors.address}</span>}
                        </div>
                    </div>

                    <div className="form-column">
                        <h2>Product Details</h2>
                        <div className="form-group">
                            <label>Product Type:</label>
                            <select
                                name="productType"
                                value={detail.productType}
                                onChange={handleInputChange}
                                className="input-field"
                            >
                                <option value="">Select Product Type</option>
                                <option value="Fertilizer">Fertilizer</option>
                                <option value="Pesticide">Pesticide</option>
                            </select>
                            {errors.productType && <span className="error-text">{errors.productType}</span>}
                        </div>
                        <div className="form-group">
                            <label>Product Name:</label>
                            <input
                                type="text"
                                name="productName"
                                value={detail.productName}
                                onChange={handleInputChange}
                                className="input-field"
                                placeholder="Enter Product Name"
                            />
                            {errors.productName && <span className="error-text">{errors.productName}</span>}
                        </div>
                        <div className="form-group">
                            <label>Brand:</label>
                            <input
                                type="text"
                                name="brand"
                                value={detail.brand}
                                onChange={handleInputChange}
                                className="input-field"
                                placeholder="Enter Brand"
                            />
                            {errors.brand && <span className="error-text">{errors.brand}</span>}
                        </div>
                        <div className="form-group">
                            <label>Amount:</label>
                            <input
                                type="text"
                                name="amount"
                                value={detail.amount}
                                onChange={handleInputChange}
                                className="input-field"
                                placeholder="Enter Amount"
                            />
                            {errors.amount && <span className="error-text">{errors.amount}</span>}
                        </div>
                        <div className="form-group">
                            <label>Price:</label>
                            <input
                                type="text"
                                name="price"
                                value={detail.price}
                                onChange={handleInputChange}
                                className="input-field"
                                placeholder="Enter Price"
                            />
                            {errors.price && <span className="error-text">{errors.price}</span>}
                        </div>
                    </div>
                </div>
                <button type="submit" className="refill_button">Update Details</button>
            </form>
        </div>
    );
}

export default EditDetails;
