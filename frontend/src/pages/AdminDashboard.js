import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [shipments, setShipments] = useState([]);

  const load = async () => {
    const res = await API.get("/shipments");
    setShipments(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {shipments.map((s) => (
            <tr key={s._id}>
              <td>{s.trackingId}</td>
              <td>{s.currentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}