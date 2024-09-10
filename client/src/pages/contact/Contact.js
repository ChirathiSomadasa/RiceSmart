import { useEffect, useState } from 'react';
import React from 'react';
import { json,Link } from 'react-router-dom';
import './Contact.css';
import axios from 'axios';
import { MdOutlineLocationOn } from "react-icons/md";
import { jsPDF } from "jspdf";
import serviceImage from '../../images/Contact/Qwelcome.jpg';  // Make sure to place your image in the public/images folder or src/images folder


function Contact() {
  const [contactData, setContactData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

 
  const handleAddProblem = () => {
    window.location.href = '/contact/ProblemForm';
};

const handleDisease = () => {
  window.location.href = '/contact/ManageDisease';
};

useEffect(() => {

  axios.get('http://localhost:5001/')
  .then(result => setContactData(result.data))
  .catch(err => console.log(err))
},[]);



  function handleSearch() {
    // Implement search logic here
    // For example, filter productData based on searchQuery
    const filteredContacts = contactData.filter(contact=> 
      contact.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setContactData(filteredContacts);
  }


const handleSolution = (id) => {
  // Redirect to the edit page
  window.location.href = `/contact/AddSolution/${id}`;


};
 
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    handleSearch();  // Trigger search when "Enter" key is pressed
  }
}

const generateReport = () => {
  const doc = new jsPDF();
  doc.text("Disease Report", 10, 10);
  doc.text("All Available Products in the store : ", 10, 18);

 
  // Add header
const header = [['Disease Name', 'Category', 'Description', 'Location', 'Solutions']];

  // Add some sample data (replace with your actual product data)
const data = [];

 // Populate data array with product data
 contactData.forEach(contact => {
     data.push([
      contact.disease,
      contact.category,
      contact.description,
      contact.location,
      contact.solutions,
          
     ]);
  });

  // Set table style
  const styles = {
        fontSize: 10,
        cellPadding: 2
     
  };

  // Set table column widths
  const columnWidths = ['auto', 'auto', 'auto', 'auto', 'auto', 'auto' ];

  // Auto-generate table
  doc.autoTable({
     head: header,
     body: data,
     startY: 20, // Start y-position of the table
     styles: styles,
     columnStyles: {
      0: { fontStyle: 'bold' } // Make the first column bold
     },
     columnWidth: columnWidths,
     margin: { top: 30 } // Add margin between header and table
  });  
  
 

     
     doc.save("Product Report.pdf"); // Save the PDF
      
};
  return (
    <div>
      <div className='Qparallax'>
        <div className="Qcentered">
          <h1>Smart Farming, Better Solutions</h1>
        </div>
      </div>

            <div className='QWelcomeContent'>
                <div className='Qwelcome_topic'> <h1>Why Choose our Services</h1></div>

                <div className='Qwelcome'>

                    <div className='Qwelcome_des'>
                        <p>Improve your rice cultivation with RiceSmart's innovative equipment and expert advice. 
                          We offer real-time disease monitoring and accurate production 
                          estimates to enhance your farming methods.
                        <br></br><br></br>

                        Our platform provides individualized solutions for pest management, 
                        nutrient deficits, and best farming practices. Receive expert guidance 
                        suited to your individual needs.
                        <br></br><br></br>

                        RiceSmart enables real-time crop health monitoring, early hazard detection, 
                        and accurate harvest planning. Our expert recommendations for fertilizers 
                        and insecticides can help your crops grow.<br></br><br></br>

                        Join our network of forward-thinking farmers to learn about the future of rice 
                        agriculture. RiceSmart provides tools and knowledge for educated decision-making, 
                        leading to sustainable and prosperous farming.

                        </p>

                    </div>

                    <div className='Qwelcome_photo'><img src={serviceImage} alt="welcome" /></div>
                </div>
               
            </div>
           
              <div class="QStoreSearch">
                <input type="text" class="QSearch" onClick={handleSearch} value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}  // Update search query state
                onKeyPress={handleKeyPress}  // Listen for "Enter" key press
                placeholder="Search by category..." />
              </div>
              <div class="QaddBtn">
             <Link to="/Contact/AddProblem">
                  <div><button type="primary" onClick={handleAddProblem} className="Qadd-problem-button">Add Disease
                  </button></div>
             </Link>
            <Link to="/Contact/ManageDisease">
                  <div><button type="primary" onClick={handleDisease} className="Qmanagebtn">Manage Disease
                  </button></div>
            </Link>
            <Link >
                  <div><button type="primary" onClick={generateReport} className="Qgeneratebtn">Generate Report
                  </button></div>
            </Link>
            </div>
            <div class="QContactStore">
    {
        contactData.map((contact) => (
            <div class="QContactCard" key={contact._id}>
                <h7>{contact.category}</h7>                
                <p><strong>Disease    :</strong> {contact.disease}</p>
                <p><strong>Symptoms   :</strong> {contact.description}</p>
                <p><MdOutlineLocationOn className="QlocationIcon"/>{contact.location}</p>
                 <div>
                  <h4>Solutions:</h4>
                  { 
                    contact.solutions.map((sol, index) => (
                      <ul>
                      <li key={index}> {sol.solution}</li>
                      </ul>
                    ))
                   }
                </div>
                <div class="QCardActions">
                  <div><button type="primary"  onClick={() => handleSolution(contact._id)} className="QSolutionbtn">Add Solution
                  </button></div>
                </div>
            </div>
        ))
    }
</div>

    </div>
  

  );
}

export default Contact;
