import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

const AdminDashboard = ({ isAuthenticated, fetchUsers, fetchStores, userData, storeData }) => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalStores, setTotalStores] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const navigate = useNavigate(); 
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (userData.length === 0) fetchUsers();
    if (storeData.length === 0) fetchStores();

    setTotalUsers(userData.length);
    setTotalStores(storeData.length);
    setTotalRatings(storeData.filter((store) => store.rating).length); 
  }, [userData, storeData, fetchUsers, fetchStores]);

  
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error during logout: ", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1><br></br><br></br>
      
      {isAuthenticated && (
        <nav style={styles.nav}>
          <div style={styles.navLinksContainer}>
            <NavLink to="/admin" style={({ isActive }) => isActive ? {...styles.navLink, ...styles.hoverNavLink} : styles.navLink}>
              Add User/Store
            </NavLink>
            <NavLink to="/users" style={({ isActive }) => isActive ? {...styles.navLink, ...styles.hoverNavLink} : styles.navLink}>
              View Users
            </NavLink>
            <NavLink to="/stores" style={({ isActive }) => isActive ? {...styles.navLink, ...styles.hoverNavLink} : styles.navLink}>
              View Stores
            </NavLink>
          </div>
          <button
            style={isLoggingOut ? { ...styles.logoutButton, ...styles.logoutButtonHover } : styles.logoutButton}
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Logging Out..." : "Logout"}
          </button>
        </nav>
      )}<br></br><br></br>
      
      <div style={styles.cardstyle}>
      <div style={styles.card}>
        <h3>Total Users</h3>
        <p>{totalUsers}</p>
      </div>
      <div style={styles.card}>
        <h3>Total Stores</h3>
        <p>{totalStores}</p>
      </div>
      <div style={styles.card}>
        <h3>Total Ratings</h3>
        <p>{totalRatings}</p>
      </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    border:"2px solid gray",
  },
  nav: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "10%",
  },
  navLinksContainer: {
    display: "flex",
    gap: "15px",
  },
  navLink: {
    textDecoration: "none",
    color: "white",
    fontSize: "22px",
    fontWeight: "bold",
    border: "1px solid #ccc",
    padding: "5px 10px",
    borderRadius: "4px",
    background: "linear-gradient(to right, rgb(130, 138, 134), rgb(54, 192, 230))",
    transition: "background-color 0.3s, color 0.3s",
  },
  hoverNavLink: {
    background: "linear-gradient(to right, rgb(9, 50, 68), rgb(50, 206, 249))",
    color: "white",
    borderColor: "#007bff",
  },
  logoutButton: {
    padding: "8px 15px",
    fontSize: "22px",
    fontWeight: "bold",
    color: "white",
    background: "linear-gradient(to right, rgb(9, 50, 68), rgb(50, 206, 249))",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
    marginLeft: "auto",
    marginRight: "5%",
  },
  logoutButtonHover: {
    background: "linear-gradient(to right, rgb(9, 50, 68), rgb(50, 206, 249))",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
  },
  card: {
    display: "inline-block",
    width: "280px", 
    height: "220px", 
    margin: "20px",
    padding: "25px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
    backgroundColor: "#fff",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  cardstyle: {
    padding: "30px", 
    display: "flex",
    justifyContent: "center", 
    flexWrap: "wrap",
    marginTop: "40px", 
  },
};

export default AdminDashboard;
