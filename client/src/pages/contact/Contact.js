import { useEffect, useState } from 'react';
import React from 'react';
import { json,Link } from 'react-router-dom';
import './Contact.css';
import axios from 'axios';
import { MdDeleteOutline,MdEdit } from "react-icons/md";
import serviceImage from 'F:/RiceSmart/RiceSmart/client/src/images/Contact/Qwelcome.jpg';  // Make sure to place your image in the public/images folder or src/images folder


function Contact() {
  const [contactData, setContactData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

 
  const handleAddProblem = () => {
    window.location.href = '/contact/ProblemForm';
};

useEffect(() => {

  axios.get('http://localhost:5001/')
  .then(result => setContactData(result.data))
  .catch(err => console.log(err))
},[]);
/*
  axios.post("http://localhost:5001/contact/get", {}).then((response) => {
    var data = response.data;
    setContactData(data);
  });
*/
  /*
   fetch("/api").then(
    response => response.json()
   ).then(
    data => {
      setContactData(data)
    }
   )
  */

const handleDelete = (id) => {
    // Display a confirmation popup
    if (window.confirm("Are you sure you want to delete it?")) {
        // If confirmed, proceed with the deletion
        axios.delete(`http://localhost:5001/deleteContact/${id}`)
            .then(() => {
                // After successful deletion, update state
                setContactData(contactData.filter(contact => contact._id !== id));
                
                // Display success message
                alert("Problem deleted successfully.");
            })
            .catch(err => {
                console.log(err);
                // Optionally display an error message
                alert("Failed to delete the problem. Please try again.");
            });
    } else {
        // If the user cancels the deletion, you can log or handle it here
        console.log("Deletion cancelled.");
    }
};


  function handleSearch() {
    // Implement search logic here
    // For example, filter productData based on searchQuery
    const filteredContacts = contactData.filter(contact=> 
      contact.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setContactData(filteredContacts);
  }

  const handleEdit = (id) => {
    // Redirect to the edit page
    window.location.href = `/contact/UpdateContact/${id}`;


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
            <div class="QaddBtn">
             <Link to="/Contact/AddProblem">
                  <div><button type="primary" onClick={handleAddProblem} className="Qadd-problem-button">Add Disease
                  </button></div>
            </Link>

              <div class="QStoreSearch">
                <input type="text" class="QSearch" onClick={handleSearch} placeholder="Search disease" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
            </div>
            <div class="QContactStore">
    {
        contactData.map((contact) => (
            <div class="QContactCard" key={contact._id}>
                <h3>{contact.disease}</h3>
                <MdEdit className="QEditIcon" onClick={() => handleEdit(contact._id)} />                
                <p><strong>Symptoms:</strong> {contact.description}</p>
                <p><strong>Category:</strong> {contact.category}</p>
                <p><strong>Location:</strong> {contact.location}</p>
                <div class="QCardActions">
                <Link to="/Contact/AddProblem">
                  <div><button type="primary" onClick={handleAddProblem} className="Qadd-problem-button">Add Solution
                  </button></div>
            </Link>
                    <MdDeleteOutline className="QdeleteIcon" onClick={() => handleDelete(contact._id)} />

                </div>
            </div>
        ))
    }
</div>

    </div>
  

  );
}

export default Contact;
