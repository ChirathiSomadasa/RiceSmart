import React from 'react';
import './SearchFertilizer.css';
import yaraMila from '../../images/fertilizers/yaraMila.jpg';


function Details() {
    return (
        <div className="details-container">
            
            <div className="details-left">
            <div className='yaraMila'><img src={yaraMila} alt="yaraMila" /></div>
                <h3>Application Methods</h3>
                <ul className="application-methods">
                    <li>Spray directly on leaves in the early morning</li>
                    <li>Apply as a soil drench for deep penetration</li>
                    <li>Use drip irrigation for even distribution</li>
                </ul>
            </div>

            
            <div className="details-right">
                <h1 className="product-name">Product Name: Yara Mila 500 SC</h1>
                <p className="product-description">
                    Chemfa 500 SC is a highly effective herbicide designed to control a variety of narrow-leaf and broadleaf weeds. This product ensures crop safety while promoting growth in paddy fields. 
                </p>
                
                
                <h3 className="table-title">Application Guide</h3>
                <table className="application-table">
                    <thead>
                        <tr>
                            <th>Target Pest/Disease</th>
                            <th>Dose per Acre</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Narrow Leaf Weeds</td>
                            <td>1 liter</td>
                        </tr>
                        <tr>
                            <td>Broad Leaf Weeds</td>
                            <td>1.5 liters</td>
                        </tr>
                        <tr>
                            <td>Sedges</td>
                            <td>1.2 liters</td>
                        </tr>
                    </tbody>
                </table>

                
                <h3>Features and Benefits</h3>
                <ul className="features-benefits">
                    <li>Provides long-lasting weed control</li>
                    <li>Minimizes competition for nutrients</li>
                    <li>Promotes healthy crop growth</li>
                    <li>Rainfast within 2 hours of application</li>
                </ul>
            </div>
        </div>
    );
}

export default Details;
