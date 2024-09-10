import React, { useEffect } from 'react';
import './recommend.css';
import Problems from '../../images/fertilizers/problem.jpg';
import RiceBlast1 from '../../images/fertilizers/riceblast1.jpg';
import RiceBlast2 from '../../images/fertilizers/riceblast2.jpg';
import Amistar from '../../images/fertilizers/amistar.jpg';
import yaraMila from '../../images/fertilizers/yaraMila.jpg';
import Znso4 from '../../images/fertilizers/zns04.png';
import Propiconazole from '../../images/fertilizers/propiconazole.png';
import Yurea from '../../images/fertilizers/yurea.jpeg';

function Recommend() {

    // Image sources for each pest or disease
    const pestImages = {
        RiceBlast: [
            RiceBlast1,
            RiceBlast2,
            
        ]
    };

    // Function to change the images using React refs
    const rotateImages = (imageElementId, images) => {
        let index = 0;
        const changeImage = () => {
            const imageElement = document.getElementById(imageElementId);
            if (imageElement) {
                imageElement.src = images[index];
                index = (index + 1) % images.length; // Rotate index
            }
        };
        setInterval(changeImage, 2000); // Change image every second
    };

    // useEffect hook to handle lifecycle and image rotation
    useEffect(() => {
        rotateImages('RiceBlast', pestImages.RiceBlast);
        rotateImages('stemBorerImage', pestImages.stemBorer);
    }, []);

    return (
        <div className="recommend-container">
            <h1>Problems Faced By Farmers</h1>
            <p>Weeds, Insectes & Diseases causes harms to the crop and farmers lose an estimated average of 37% of their rice crop due to pests & diseases every year. In addition to good crop management, timely and accurate diagnosis of these pest & diseases and proper chemical management can significantly reduce these losses.</p>
            <div className='problem'><img src={Problems} alt="Farmer in distress" /></div>
            <table className="recommend-table">
                <thead>
                    <tr>
                        <th>Pests Or Diseases</th>
                        <th>Recommended Product Solutions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td className="pest-section">
                            <h3>Rice Blast Disease</h3>
                            <div className="rotating-section">
                                <img id="RiceBlast" className="pest-image" src={pestImages.RiceBlast[0]} alt="Rice Blast Disease" />
                            </div>
                            
                        </td>
                        <td className="product-section">
                        <img className="product-image" src={yaraMila} alt="Chemfa Product" />

                            <p>Spray in Splits to reduce excessive growth.</p>
                        </td>
                        
                    </tr>
                    <tr>
                    <td className="pest-section">
                            <h3>Sheath Blight Disease</h3>
                            <div className="rotating-section">
                                <img id="RiceBlast" className="pest-image" src={pestImages.RiceBlast[0]} alt="Rice Blast Disease" />
                            </div>
                            
                        </td>
                        <td className="product-section">
                        <img className="product-image" src={Amistar} alt="Chemfa Product" />
                            <p>Give Two sprays, one at the boot stage and the second one after 15 days of the first shot.</p>
                        </td>
                        
                    </tr>
                    <tr>
                    <td className="pest-section">
                            <h3>Brown Spot Disease</h3>
                            <div className="rotating-section">
                                <img id="RiceBlast" className="pest-image" src={pestImages.RiceBlast[0]} alt="Rice Blast Disease" />
                            </div>
                            
                        </td>
                        <td className="product-section">
                        <img className="product-image" src={Znso4} alt="Chemfa Product" />
                            <p>Apply 10kg oer hectare at the time of sowing.</p>
                        </td>
                        
                    </tr>
                    <tr>
                    <td className="pest-section">
                            <h3>False Smut Disease</h3>
                            <div className="rotating-section">
                                <img id="RiceBlast" className="pest-image" src={pestImages.RiceBlast[0]} alt="Rice Blast Disease" />
                            </div>
                            
                        </td>
                        <td className="product-section">
                        <img className="product-image" src={Propiconazole} alt="Chemfa Product" />
                            <p>Mix 1ml per liter of water and spray at the booting phrase. Repeat application if needed depending on the severity.</p>
                        </td>
                        
                    </tr>
                    <tr>
                    <td className="pest-section">
                            <h3>Leaf Scald Disease</h3>
                            <div className="rotating-section">
                                <img id="RiceBlast" className="pest-image" src={pestImages.RiceBlast[0]} alt="Rice Blast Disease" />
                            </div>
                            
                        </td>
                        <td className="product-section">
                        <img className="product-image" src={Yurea} alt="Chemfa Product" />
                            <p>Suitable to use 50kg per hectare.Split into two applications and apply.</p>
                        </td>
                        
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Recommend;
