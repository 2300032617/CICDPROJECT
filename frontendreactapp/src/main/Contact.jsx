import { useState } from 'react';
import axios from 'axios';
import config from '../config';
import './style.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: '',
    email: '',
    mobileno: '',
    location: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/sendemail`, formData);
      setMessage(response.data);
      setError('');

      // reset form
      setFormData({
        name: '',
        subject: '',
        message: '',
        email: '',
        mobileno: '',
        location: ''
      });
    } catch (err) {
      setError('Failed to send email');
      setMessage('');
      console.error(err);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h3>Contact Us</h3>

        {message ? (
          <p className="contact-success">{message}</p>
        ) : (
          <p className="contact-error">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="contact-form">
          <div>
            <label>Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Subject</label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Message</label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Mobile No</label>
            <input
              type="number"
              id="mobileno"
              value={formData.mobileno}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Location</label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
