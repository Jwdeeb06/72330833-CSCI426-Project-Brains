import React from "react";
import "../styles/Messages.css";

const Messages=()=> {
  //satic data
  const messages = [
    {
      id: 1,
      name: "Ali Ahmed",
      email: "ali@example.com",
      message: "Hi, I’d like to ask about the AI course schedule.",
      date: "2025-11-18",
    },
    {
      id: 2,
      name: "Maya Nasser",
      email: "maya@example.com",
      message: "Can I register online for the Programming course?",
      date: "2025-11-17",
    },
    {
      id: 3,
      name: "Omar Khaled",
      email: "omar@example.com",
      message: "Is the Cyber Security class still open for registration?",
      date: "2025-11-15",
    },
  ];

  return (
    <div className="messages-page">
      <h1>📩 Contact Messages</h1>
      <div className="table-container">
        <table className="messages-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, index) => (
              <tr key={msg.id}>
                <td>{index + 1}</td>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
                <td>{msg.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Messages;

