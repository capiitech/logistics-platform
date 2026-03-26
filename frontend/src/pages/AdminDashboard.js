import React, { useState } from 'react';
import API from '../services/api';

function AdminDashboard() {
  const [formData, setFormData] = useState({
    trackingId: '',
    sender: '',
    receiver: '',
    currentStatus: 'Pending'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateShipment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await API.post('/shipment', formData);
      setMessage('Shipment created successfully!');
      setFormData({
        trackingId: '',
        sender: '',
        receiver: '',
        currentStatus: 'Pending'
      });
    } catch (err) {
      setMessage(err.response?.data || 'Failed to create shipment');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <form onSubmit={handleCreateShipment} className="shipment-form">
        <h3>Create New Shipment</h3>
        {message && <p className="message">{message}</p>}
        
        <input
          type="text"
          name="trackingId"
          placeholder="Tracking ID"
          value={formData.trackingId}
          onChange={handleChange}
          required
        />
        
        <input
          type="text"
          name="sender"
          placeholder="Sender Name"
          value={formData.sender}
          onChange={handleChange}
          required
        />
        
        <input
          type="text"
          name="receiver"
          placeholder="Receiver Name"
          value={formData.receiver}
          onChange={handleChange}
          required
        />
        
        <select
          name="currentStatus"
          value={formData.currentStatus}
          onChange={handleChange}
          required
        >
          <option>Pending</option>
          <option>In Transit</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Shipment'}
        </button>
      </form>
    </div>
  );
}

export default AdminDashboard;
