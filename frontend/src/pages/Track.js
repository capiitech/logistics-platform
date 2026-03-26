import { useState } from "react";
import API from "../services/api";

export default function Track() {
  const [id, setId] = useState("");
  const [data, setData] = useState(null);

  const track = async () => {
    try {
      const res = await API.get(`/shipment/${id}`);
      setData(res.data);
    } catch {
      alert("Shipment not found");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Track Shipment</h2>

      <input onChange={(e) => setId(e.target.value)} />
      <button onClick={track}>Track</button>

      {data && (
        <div>
          <h3>Status: {data.currentStatus}</h3>

          {data.history.map((h, i) => (
            <div key={i}>
              <p>{h.status}</p>
              <p>{h.location}</p>
              <p>{h.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}