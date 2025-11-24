import React from "react";
import { useAuth } from "../components/AuthContext";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="admin-dashboard-page">
      <h1>Welcome, {user.username} 👋</h1>
      <p>This is your Admin Dashboard.</p>

      <div className="admin-dashboard-cards">
        <div className="admin-card">
          <h3>📚 Courses</h3>
          <p>7 Active</p>
        </div>
        <div className="admin-card">
          <h3>👩‍🎓 Students</h3>
          <p>120 Registered</p>
        </div>
        <div className="admin-card">
          <h3>✉️ Messages</h3>
          <p>3 New</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
