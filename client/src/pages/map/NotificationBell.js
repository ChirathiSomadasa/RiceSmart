import React, { useState, useEffect } from 'react';
import './NotificationBell.css';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  // WebSocket setup to receive notifications
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5001');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications((prev) => [...prev, data.message]);
    };

    return () => {
      ws.close();
    };
  }, []);

  // Toggle notification dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  return (
    <div className="notification-bell-container">
      <div className="bell-icon" onClick={toggleDropdown}>
        <i className="fas fa-bell"></i>
        {notifications.length > 0 && <span className="notification-count">{notifications.length}</span>}
      </div>

      {isOpen && (
        <div className="notification-dropdown">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div
                key={index}
                className="notification-item"
                onClick={() => handleNotificationClick(notification)}
              >
                {notification}
              </div>
            ))
          ) : (
            <div className="notification-item">No new notifications</div>
          )}
        </div>
      )}

      {selectedNotification && (
        <div className="notification-detail">
          <h2>Notification Details</h2>
          <p>{selectedNotification}</p>
          <button onClick={() => setSelectedNotification(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
