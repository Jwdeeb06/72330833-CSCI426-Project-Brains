import React, { useState } from "react";
import "../styles/AddUser.css";

const AddUser = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleAddUser = () => {
    if (username && password) {
      const newUser = {
        id: Date.now(),
        username,
        password,
        active: true,
      };
      setUsers([...users, newUser]);
      setUsername("");
      setPassword("");
    } else {
      alert("⚠️ Please fill in all fields.");
    }
  };

  const toggleActive = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  return (
    <div className="add-user-page">
      <h1>Add User</h1>

      <div className="add-user-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.active ? "Active" : "Inactive"}</td>
              <td>
                <button
                  className={`status-btn ${user.active ? "deactivate" : "activate"}`}
                  onClick={() => toggleActive(user.id)}
                >
                  {user.active ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddUser;