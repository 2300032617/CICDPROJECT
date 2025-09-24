import './style.css'; 

export default function About() {
  return (
    <div className="about-container">
      <h2 className="about-title">About Our Event Management System</h2>
      
      <p className="about-text">
        Welcome to our <strong>Event Management System</strong> 🚀 <br />
        This platform is designed to make event planning simple and effective.
      </p>

      <section className="about-section">
        <h3>Our Mission</h3>
        <p>
          To provide a seamless way for admins, managers, and customers 
          to manage and book events with ease and efficiency.
        </p>
      </section>

      <section className="about-section">
        <h3>Features</h3>
        <ul>
          <li>✅ Admin can manage event managers and customers.</li>
          <li>✅ Event Managers can add and manage events.</li>
          <li>✅ Customers can book and track events easily.</li>
        </ul>
      </section>

      <section className="about-section">
        <h3>Built With</h3>
        <p>⚡ React.js • Spring Boot • MySQL</p>
      </section>

      {/* <section className="about-section">
        <h3>About the Developer</h3>
        <p>
          Created by <strong>Siri</strong>, a passionate Computer Science Engineering 
          student with strong skills in Java, C++, and Python.
        </p>
      </section> */}

      {/* <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
        alt="React Logo"
        className="about-image"
      /> */}
    </div>
  );
}
