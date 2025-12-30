import React, { useState } from "react";
import "../styles/RegisterCourse.css";
import axios from "axios";
const RegisterCourse = ({ course, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`✅ Registration successful!\n\n${JSON.stringify(form, null, 2)}`);
    onClose();
  };
  return (
    <div className="register-overlay">
      <div className="register-box">
        {/* ❌ Small box on top-left corner */}
        <button className="close-btn" onClick={onClose}>✖</button>

        <h2>Register for {course.name}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterCourse;