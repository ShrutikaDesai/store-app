import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebase";
import "./UsersList.css";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    searchTerm: "", // Unified filter
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList = querySnapshot.docs.map((doc) => ({
        userId: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching users: ", error);
      alert("Failed to fetch users.");
    }
  };

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchTerm: value,
    }));
  };

  const handleSort = (key) => {
    setSortConfig((prevSortConfig) => {
      if (prevSortConfig.key === key) {
        return { key, direction: prevSortConfig.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
    const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredUsers = sortedUsers.filter((user) => {
    const lowerCaseSearchTerm = filters.searchTerm.toLowerCase();
    return (
      (user.name && user.name.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (user.email && user.email.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (user.address && user.address.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (user.role && user.role.toLowerCase().includes(lowerCaseSearchTerm))
    );
  });

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? " ▲" : " ▼";
    }
    return "";
  };

  return (
    <div className="container">
      <h1>Users List</h1>
      <button className="back-button" onClick={() => navigate("/admin-dash")}>
        Back
      </button>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by Name, Email, Address, or Role"
          value={filters.searchTerm}
          onChange={handleFilterChange}
          className="filter-input"
        />
      </div>

      {filteredUsers.length === 0 ? (
        <p className="no-users">No users to display.</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("userId")}>
                User ID{getSortIndicator("userId")}
              </th>
              <th onClick={() => handleSort("name")}>
                Name{getSortIndicator("name")}
              </th>
              <th onClick={() => handleSort("email")}>
                Email{getSortIndicator("email")}
              </th>
              <th onClick={() => handleSort("role")}>
                Role{getSortIndicator("role")}
              </th>
              <th onClick={() => handleSort("address")}>
                Address{getSortIndicator("address")}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.userId}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersList;
