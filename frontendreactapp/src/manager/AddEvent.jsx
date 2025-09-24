import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export default function AddEvent() {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    capacity: '',
    cost: ''
  });

  const [manager, setManager] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Load manager info from sessionStorage
  useEffect(() => {
    const storedManager = sessionStorage.getItem('manager');
    if (storedManager) {
      const mgr = JSON.parse(storedManager);
      console.log("Loaded manager from sessionStorage:", mgr);
      setManager(mgr);
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Submit event
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!manager || (!manager.manager_id && !manager.id)) {
      setError("Manager info missing. Please log in again.");
      setMessage('');
      return;
    }

    // Prepare payload
    const eventData = {
      category: formData.category,
      title: formData.title,
      description: formData.description,
      capacity: parseInt(formData.capacity),
      cost: parseFloat(formData.cost),
      managerId: manager.manager_id || manager.id
    };

    console.log("Sending eventData:", eventData); // debug log

    try {
      const response = await axios.post(`${config.url}/manager/addevent`, eventData);

      if (response.status === 200) {
        setMessage(response.data);
        setError('');
        setFormData({
          category: '',
          title: '',
          description: '',
          capacity: '',
          cost: ''
        });
      }
    } catch (err) {
      console.error("Error response:", err);
      setMessage('');
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Add New Event</h3>

      {message && <p style={{ textAlign: "center", color: "green", fontWeight: "bold" }}>{message}</p>}
      {error && <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Category</label>
          <input type="text" id="category" value={formData.category} onChange={handleChange} required style={{ width: "100%" }} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Title</label>
          <input type="text" id="title" value={formData.title} onChange={handleChange} required style={{ width: "100%" }} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Description</label>
          <textarea id="description" value={formData.description} onChange={handleChange} required style={{ width: "100%" }} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Capacity</label>
          <input type="number" id="capacity" value={formData.capacity} onChange={handleChange} required style={{ width: "100%" }} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Cost</label>
          <input type="number" step="0.01" id="cost" value={formData.cost} onChange={handleChange} required style={{ width: "100%" }} />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }}>Add Event</button>
      </form>
    </div>
  );
}