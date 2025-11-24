import React, { useState } from "react";
import poster from "../assets/poster.png";
import "../styles/Contact.css";

const Contact=()=> {
  const [state, setState] = useState({ fname: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent!\n\n" + JSON.stringify(state, null, 2));
  };

  return (
    <div className="contact">
      {/* Left side - background image */}
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${poster})` }}
      ></div>

      {/* Right side - form */}
      <div className="rightSide">
        <div className="contact-header">
          <h1>Get in Touch</h1>
          <p>We’d love to hear from you! Fill out the form and we’ll respond soon.</p>
        </div>

        <form id="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="fname">Full Name</label>
          <input
            name="fname"
            type="text"
            placeholder="Enter your full name..."
            value={state.fname}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email..."
            value={state.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            rows="6"
            placeholder="Write your message..."
            value={state.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>

        <div className="contact-info">
          <p>📍 Chaqra, Lebanon</p>
          <p>📞 +961 03 532 430</p>
          <p>✉️ info@brainsinstitute.edu</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;