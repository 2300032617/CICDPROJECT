import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import './customer.css';

export default function ViewAllEvents() {
  const [events, setEvents] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    id: '',
    manager: '',
    company: '',
    category: '',
    title: '',
    description: '',
    capacity: '',
    cost: ''
  });
  const [notLoggedIn, setNotLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      const response = await fetch(`${config.url}/customer/viewallevents`);
      const data = await response.json();
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]);
    }
  };

  // Redirect to BookEvent page with eventid
  const handleBookClick = (eventId) => {
    const customer = JSON.parse(sessionStorage.getItem("customer"));

    if (!customer || !customer.id) {
      setNotLoggedIn(true);
      return;
    }

    navigate(`/bookevent?eventid=${eventId}`);
  };

  const handleSearchChange = (e, field) => {
    setSearchTerms(prev => ({ ...prev, [field]: e.target.value }));
  };

  const filteredEvents = events.filter(event => {
    return (
      event?.id?.toString().includes(searchTerms.id) &&
      (event?.manager?.name || '').toLowerCase().includes(searchTerms.manager.toLowerCase()) &&
      (event?.manager?.company_name || '').toLowerCase().includes(searchTerms.company.toLowerCase()) &&
      (event?.category || '').toLowerCase().includes(searchTerms.category.toLowerCase()) &&
      (event?.title || '').toLowerCase().includes(searchTerms.title.toLowerCase()) &&
      (event?.description || '').toLowerCase().includes(searchTerms.description.toLowerCase()) &&
      event?.capacity?.toString().includes(searchTerms.capacity) &&
      event?.cost?.toString().includes(searchTerms.cost)
    );
  });

  return (
    <div className="event-container">
      <h3 className="event-heading">Available Events</h3>

      {notLoggedIn && (
        <p style={{ color: 'red', textAlign: 'center' }}>
          Please log in to book an event.
        </p>
      )}

      <table className="event-table">
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Company Name</th>
            <th>Company Location</th>
            <th>Category</th>
            <th>Title</th>
            <th>Description</th>
            <th>Capacity</th>
            <th>Cost</th>
            <th>Action</th>
          </tr>
          <tr>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'id')} /></th>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'manager')} /></th>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'company')} /></th>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'category')} /></th>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'title')} /></th>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'description')} /></th>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'capacity')} /></th>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'cost')} /></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <tr key={event?.id}>
                <td>{event?.id || 'N/A'}</td>
                <td>{event?.manager?.company_name || 'N/A'}</td>
                <td>{event?.manager?.company_location || 'N/A'}</td>
                <td>{event?.category || 'N/A'}</td>
                <td>{event?.title || 'N/A'}</td>
                <td>{event?.description || 'N/A'}</td>
                <td>{event?.capacity || 'N/A'}</td>
                <td>{event?.cost || 'N/A'}</td>
                <td>
                  <button className="book-button" onClick={() => handleBookClick(event?.id)}>Book</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No matching events found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
