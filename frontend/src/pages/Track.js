import React, { useState } from 'react';
import API from '../services/api';

function Track() {
  const [trackingId, setTrackingId] = useState('');
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await API.get(`/shipment/${trackingId}`);
      setShipment(response.data);
    } catch (err) {
      setError(err.response?.data || 'Shipment not found');
      setShipment(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="track-container">
      <h2>Track Your Shipment</h2>
      <form onSubmit={handleTrack}>
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Tracking...' : 'Track'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {shipment && (
        <div className="shipment-details">
          <h3>Shipment Details</h3>
          <p><strong>Tracking ID:</strong> {shipment.trackingId}</p>
          <p><strong>From:</strong> {shipment.sender}</p>
          <p><strong>To:</strong> {shipment.receiver}</p>
          <p><strong>Status:</strong> {shipment.currentStatus}</p>
          
          <h4>History:</h4>
          <ul>
            {shipment.history?.map((entry, idx) => (
              <li key={idx}>
                <strong>{entry.status}</strong> - {entry.location}
                <br />
                {entry.comment} ({new Date(entry.timestamp).toLocaleString()})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Track;
