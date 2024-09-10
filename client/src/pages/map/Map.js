import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for missing marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


const getCircleOptions = (dangerLevel) => {
    const colors = {
      high: { color: 'red', radius: 1000 },
      medium: { color: 'orange', radius: 700 },
      low: { color: 'yellow', radius: 500 },
      safe: { color: 'green', radius: 300 },
    };
  
    return colors[dangerLevel] || colors.safe; // Default to 'safe' if dangerLevel is not found
};




function Map() {
//   const position = [6.9271, 79.8612]; // Coordinates for Colombo, Sri Lanka
  const position = [7.945, 80.821]; // Approximate center of Sri Lanka
  const [locations, setLocations] = useState([]);


                                    /// get location from DB
//   useEffect(() => {
//     fetch('/api/locations')
//       .then(response => response.json())
//       .then(data => setLocations(data))
//       .catch(err => console.error('Error fetching locations:', err));
//   }, []);



                                // Mock data for demonstration
                                // You should replace this with a real fetch call to your API
  useEffect(() => {
    setLocations([
        { name: 'Anuradhapura', coordinates: [8.3114, 80.4037], dangerLevel: 'high' },
        { name: 'Polonnaruwa', coordinates: [7.9507, 81.0253], dangerLevel: 'medium' }
    ]);
  }, []);


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <MapContainer center={position} zoom={9} style={{ height: '500px', width: '800px' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />


        {locations.map((location, index) => {
          const { color, radius } = getCircleOptions(location.dangerLevel);

          return (
            <React.Fragment key={index}>
              <Circle
                center={location.coordinates}
                pathOptions={{ color: color, fillColor: color, fillOpacity: 0.3 }}
                radius={radius}
              />
              <Marker position={location.coordinates}>
                <Popup>
                  {location.name} - Danger Level: {location.dangerLevel}
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}




            {/* {locations.map(location => (
            <Marker key={location._id} position={location.coordinates}> 
                <Popup>
                    {location.name} // Mock data for demonstration
                </Popup>
            </Marker>
            ))} */}

            {/* <Marker position={position}>
                <Popup>
                    Colombo, Sri Lanka
                </Popup>
            </Marker> */}


        </MapContainer>
    </div>
  );
}

export default Map;
