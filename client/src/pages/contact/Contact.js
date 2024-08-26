 import { useEffect, useState } from 'react';
import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import './Contact.css';
import { useNavigate } from 'react-router-dom';
import serviceImage from 'F:/RiceSmart/RiceSmart/client/src/images/Contact/Qwelcome.jpg';  // Make sure to place your image in the public/images folder or src/images folder


function Contact() {
  var navigate = useNavigate();

  const handleAddProblem = () => {
    // Navigate to a form page to add a problem
    navigate('/add-problem');
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
     
     
    </div>
  

  );
}

export default Contact;
