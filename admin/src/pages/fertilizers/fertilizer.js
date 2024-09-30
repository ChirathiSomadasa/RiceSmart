import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'; // Importing fonts directly
import Logo from '../../images/logo.png'; 
import './fertilizer.css';

// Register fonts with pdfmake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function Fertilizer() {
    const navigate = useNavigate();
    const { id } = useParams(); // Extract id from route parameters, if needed
    const [details, setDetails] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDetails, setFilteredDetails] = useState([]);

    // Fetch details from the server
    const fetchDetails = async () => {
        try {
            const response = await axios.get("http://localhost:5001/getdetails");
            setDetails(response.data.data); // Access the 'data' field in the response
            setFilteredDetails(response.data.data);
        } catch (error) {
            console.error("Error fetching details:", error);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    useEffect(() => {
        // Filter details based on the search term
        const filtered = details.filter(detail =>
            Object.values(detail).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredDetails(filtered);
    }, [searchTerm, details]);

   

     // Handle reject
     const handleReject = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to reject this detail?");
        
        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:5001/details/${id}`); // Assuming you want to delete on reject
                fetchDetails(); // Refresh the details list
                alert("Detail rejected successfully!"); // Notify the user
            } catch (error) {
                console.error("Error rejecting detail:", error);
                alert("An error occurred while rejecting the detail.");
            }
        } else {
            alert("Rejection canceled.");
        }
    };

     // Handle approve
     const handleApprove = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to approve this detail?");
        
        if (isConfirmed) {
            try {
                await axios.put(`http://localhost:5001/details/approve/${id}`);
                fetchDetails(); // Refresh the details list
                alert("Detail approved successfully!");
            } catch (error) {
                console.error("Error approving detail:", error);
                alert("Approval canceled due to unknown problem...try again later");
            }
        } else {
            alert("Approval canceled.");
        }
    };
    

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Handle report download
    const handleDownloadReport = async () => {
        const logoDataUrl = await loadImage(Logo);
        const docDefinition = {
            
            content: [
                {
                image: logoDataUrl,
                width: 100,
                margin: [0, 10, 0, 0],
                    
                },
                
                {
                    text: 'All User Refill Request Details Report',
                    style: 'header'
                },
                {
                    table: {
                        headerRows: 1,
                        widths: ['*', '*', '*', '*', '*', '*', '*', '*'],
                        body: [
                            [
                                { text: 'Receiver\'s Name', fillColor: '#A5D6A7', bold: true },
                                { text: 'Phone Number', fillColor: '#A5D6A7', bold: true },
                                { text: 'Address', fillColor: '#A5D6A7', bold: true },
                                { text: 'Product Type', fillColor: '#A5D6A7', bold: true },
                                { text: 'Product Name', fillColor: '#A5D6A7', bold: true },
                                { text: 'Brand', fillColor: '#A5D6A7', bold: true },
                                { text: 'Amount', fillColor: '#A5D6A7', bold: true },
                                { text: 'Total Price', fillColor: '#A5D6A7', bold: true }
                            ],
                            ...filteredDetails.map((detail) => [
                                { text: detail.receiverName, fillColor: '#E5EFE5' },
                                {text:detail.phoneNumber, fillColor: '#E5EFE5'},
                                {text:detail.address, fillColor: '#E5EFE5'},
                                {text:detail.productType, fillColor: '#E5EFE5'},
                                {text:detail.productName, fillColor: '#E5EFE5'},
                                {text:detail.brand, fillColor: '#E5EFE5'},
                                {text:detail.amount, fillColor: '#E5EFE5'},
                                {text:detail.price, fillColor: '#E5EFE5'}
                            ])
                        ]
                    },
                    layout: 'lightHorizontalLines'

        }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 20],
                    alignment: 'center',
                   
                },
                table: {
                    margin: [0, 5, 0, 15],
                   
                },
            },
            pageSize: 'A2',
            pageMargins: [80, 60, 40, 80],
            
        };

        // Generate PDF and trigger download
        pdfMake.createPdf(docDefinition).download('refillRequests_report.pdf');
    };

  // Function to load image and convert it to Data URL
const loadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.crossOrigin = 'Anonymous'; // Enable CORS if needed
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/png')); // Convert to Data URL
        };
        img.onerror = (err) => reject(err);
    });
};


    return (
        <div className="view-all">
           
            
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"/>
            
            <button
                type="button"
                className="search-button"
                onClick={() => setSearchTerm(searchTerm)}
            >
                Search
            </button>
           
            <button
                type="button"
                className="download-button"
                onClick={handleDownloadReport}
            >
                Download Report
            </button>

            <h1 className="topic">All Details</h1>

            <table className="detail-table">
                <thead>
                    <tr>
                        <th>Receiver's Name</th>
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
                    {filteredDetails.map((detail) => (
                        <tr key={detail._id}>
                            <td>{detail.receiverName}</td>
                            <td>{detail.phoneNumber}</td>
                            <td>{detail.address}</td>
                            <td>{detail.productType}</td>
                            <td>{detail.productName}</td>
                            <td>{detail.brand}</td>
                            <td>{detail.amount}</td>
                            <td>{detail.price}</td>
                            <td>
                                <button className="action-button1 reject" onClick={() => handleReject(detail._id)}>reject</button>
                                <button className="action-button1 approve" onClick={() => handleApprove(detail._id)} >Approve</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Fertilizer;
