import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AddUser.css";

const AddUser = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const API_BASE = "http://localhost:5000/api";

    // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_BASE}/users`);
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  // Add new user
  const handleAddUser = async () => {
    if (!username || !password) {
      alert("⚠️ Please fill in all fields.");
      return;
    }
    try {
      const res = await axios.post(`${API_BASE}/users/add`, { username, password });
      alert(res.data.message);
      // Update frontend list
      setUsers([...users, { id: res.data.insertId, username, password, is_active: 1 }]);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add user.");
    }
  };

  // Toggle user active status in database
  const toggleActive = async (id, currentStatus) => {
    try {
      await axios.delete(`${API_BASE}/users/delete/${id}`, {
        is_active: currentStatus ? 0 : 1, // flip current status
      });

      // Update frontend state
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, is_active: !currentStatus } : user
        )
      );
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update user status.");
    }
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
              <td>{user.is_active ? "Active" : "Inactive"}</td>
              <td>
                <button
                  className={`status-btn ${user.is_active ? "deactivate" : "activate"}`}
                  onClick={() => toggleActive(user.id, user.is_active)}
                >
                  {user.is_active ? "Deactivate" : "Activate"}
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