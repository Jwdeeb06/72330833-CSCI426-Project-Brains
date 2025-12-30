import React, { useState } from "react";
import "../styles/Registrations.css";



const Registrations = () => {
  const [registrations, setRegistrations] = useState([
    { id: 1, name: "Ali Ahmad", email: "ali@gmail.com", phone: "123456789", status: "Pending" },
    { id: 2, name: "Sara Nader", email: "sara@gmail.com", phone: "987654321", status: "Pending" },
  ]);

  const handleAction = (id, action) => {
    setRegistrations(
      registrations.map((r) =>
        r.id === id ? { ...r, status: action === "approve" ? "Approved" : "Denied" } : r
      )
    );
  };

  return (
    <div className="registrations-page">
      <h1>Registrations</h1>

      <table className="registrations-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.phone}</td>
              <td className={`status ${r.status.toLowerCase()}`}>{r.status}</td>
              <td>
                <button
                  className="approve-btn"
                  onClick={() => handleAction(r.id, "approve")}
                >
                  Approve
                </button>
                <button
                  className="deny-btn"
                  onClick={() => handleAction(r.id, "deny")}
                >
                  Deny
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Registrations;