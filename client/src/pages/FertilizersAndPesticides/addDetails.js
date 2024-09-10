import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './addDetails.css';

function AddDetails() {
    const [detail, setDetail] = useState({
        address: "",
        phoneNumber: "",
        productType: "",
        productName: "",
        brand: "",
        amount: "",
        price: ""
    });

    const [errors, setErrors] = useState({});

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setDetail(prevState => ({
            ...prevState,
            [name]: value
        }));
        validateField(name, value); // Validate field on change
    };

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

            default:
                break;
        }

        setErrors(newErrors);
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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post("http://localhost:5001/addDetails", detail);
                console.log(response);
                alert("Details added successfully!");
                setDetail({
                    
                    address: "",
                    phoneNumber: "",
                    productType: "",
                    productName: "",
                    brand: "",
                    amount: "",
                    price: ""
                });
                setErrors({});
            } catch (error) {
                console.error('Error adding details:', error);
                alert('Error adding details. Please try again later.');
            }
        } else {
            alert("Please correct the errors in the form before submitting.");
        }
    };

    return (
        <div className="refill-request-container">
            <button
                type="button"
                className="View_button"
                onClick={() => navigate('/view')}
            >
                View All Details
            </button>
            <h1 className="refill">Refill Request</h1>

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
                                onChange={handleOnChange}
                                className="input-field"
                                placeholder="Enter Your Number"
                                required
                            />
                            {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
                        </div>
                        <div className="form-group">
                            <label>Address:</label>
                            <input
                                type="text"
                                name="address"
                                value={detail.address}
                                onChange={handleOnChange}
                                className="input-field"
                                placeholder="Your Address Here"
                                required
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
                                onChange={handleOnChange}
                                className="input-field"
                                required
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
                                onChange={handleOnChange}
                                className="input-field"
                                placeholder="Enter Product Name"
                                required
                            />
                            {errors.productName && <span className="error-text">{errors.productName}</span>}
                        </div>
                        <div className="form-group">
                            <label>Brand:</label>
                            <input
                                type="text"
                                name="brand"
                                value={detail.brand}
                                onChange={handleOnChange}
                                className="input-field"
                                placeholder="Enter Brand"
                                required
                            />
                            {errors.brand && <span className="error-text">{errors.brand}</span>}
                        </div>
                        <div className="form-group">
                            <label>Amount:</label>
                            <input
                                type="text"
                                name="amount"
                                value={detail.amount}
                                onChange={handleOnChange}
                                className="input-field"
                                placeholder="Enter Amount Needed"
                                required
                            />
                            {errors.amount && <span className="error-text">{errors.amount}</span>}
                        </div>
                        <div className="form-group">
                            <label>Price:</label>
                            <input
                                type="text"
                                name="price"
                                value={detail.price}
                                onChange={handleOnChange}
                                className="input-field"
                                required
                            />
                            {errors.price && <span className="error-text">{errors.price}</span>}
                        </div>
                    </div>
                </div>
                <button type="submit" className="refill_button">Submit Details</button>
            </form>
        </div>
    );
}

export default AddDetails;
