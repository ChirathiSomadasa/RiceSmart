import React from 'react';
import './Home.css'
import WelcomeImage from '../../images/yield/welcome.jpg';

function Home() {

    return (
        <div>
            <div className='parallax'>
                <div class="centered"><h1>Smart Farming, Better Yields</h1></div>
            </div>

            <div className='salon_body'>
                <div className='welcome_topic'> <h1>Welcome to RiceSmart</h1></div>

                <div className='welcome'>

                    <div className='welcome_des'>
                        <p>Empower your rice farming with our cutting-edge solutions. At RiceSmart, 
                            we provide innovative tools and insights to optimize your cultivation process, 
                            enhance yields, and ensure a sustainable future. <br></br><br></br>

                            From real-time disease monitoring to precise yield predictions, 
                            our smart solutions are designed to elevate your farming practices. 
                            Join us in transforming rice agriculture with precision and efficiency.<br></br><br></br>

                            With RiceSmart, you can monitor diseases in real-time, staying ahead of potential 
                            threats with our cutting-edge disease detection system. Plan and optimize your harvest
                            with precise yield forecasting, and get expert advice on fertilizers and pesticides
                            to enhance crop health and productivity.<br></br><br></br>

                            Join our community of forward-thinking farmers and experience the future of rice 
                            cultivation today. With RiceSmart, you’re not just farming smarter; you’re cultivating a 
                            more sustainable and prosperous future.


                        </p>

                    </div>

                    <div className='welcome_photo'><img src={WelcomeImage} alt="welcome" /></div>
                </div>

                
               
            </div>



        </div>

    );
}

export default Home;