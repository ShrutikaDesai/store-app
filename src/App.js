// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
// import AdminDashboard from "./Components/AdminDashboard";
// import Admin from "./Components/Admin";
// import UsersList from "./Components/UsersList";
// import { db } from "./Components/firebase"; // Import your Firebase configuration
// import { collection, getDocs } from "firebase/firestore";
// import StoresList from "./Components/StoresList";
// import Login from "./Components/Login";

// const App = () => {
//   const [userData, setUserData] = useState([]);
//   const [storeData, setStoreData] = useState([]);

//   const fetchUsers = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "users"));
//       const usersList = querySnapshot.docs.map((doc) => doc.data());
//       setUserData(usersList);
//     } catch (error) {
//       console.error("Error fetching users: ", error);
//       alert("Failed to fetch users.");
//     }
//   };

//   const fetchStores = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "stores"));
//       const storesList = querySnapshot.docs.map((doc) => doc.data());
//       setStoreData(storesList);
//     } catch (error) {
//       console.error("Error fetching stores: ", error);
//       alert("Failed to fetch stores.");
//     }
//   };

//   return (
//     <Router>
//       <div style={{ padding: "20px" }}>
//         <h1>Admin Panel</h1>
//         {/* Navigation Links */}
//         <nav style={styles.nav}>
//           <NavLink
//             to="/"
//             style={({ isActive }) =>
//               isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink
//             }
//           >
//             Dashboard
//           </NavLink>
//           <NavLink
//             to="/admin"
//             style={({ isActive }) =>
//               isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink
//             }
//           >
//             Add User/Store
//           </NavLink>
//           <NavLink
//             to="/users"
//             style={({ isActive }) =>
//               isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink
//             }
//             onClick={fetchUsers}
//           >
//             View Users
//           </NavLink>
//           <NavLink
//             to="/stores"
//             style={({ isActive }) =>
//               isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink
//             }
//             onClick={fetchStores}
//           >
//             View Stores
//           </NavLink>
//         </nav>

//         {/* Routes */}
//         <Routes>
//           <Route path="/" element={<AdminDashboard />} />
//           <Route path="/admin" element={<Admin fetchUsers={fetchUsers} fetchStores={fetchStores} />} />
//           <Route path="/users" element={<UsersList users={userData} />} />
//           <Route path="/stores" element={<StoresList stores={storeData} />} />
//           <Route path="/login" element={<Login></Login>} />

//         </Routes>
//       </div>
//     </Router>
//   );
// };

// const styles = {
//   nav: {
//     marginBottom: "20px",
//     display: "flex",
//     gap: "15px",
//     alignItems: "center",
//   },
//   navLink: {
//     textDecoration: "none",
//     color: "white",
//     fontSize: "22px",
//     fontWeight:"bold",
//     border: "1px solid #ccc",
//     padding: "5px 10px",
//     borderRadius: "4px",
//     background: "linear-gradient(to right,rgb(130, 138, 134),rgb(54, 192, 230))",
//     transition: "background-color 0.3s, color 0.3s",
//   },
//   activeNavLink: {
//     background: "linear-gradient(to right,rgb(9, 50, 68),rgb(50, 206, 249))",
//     color: "white",
//     borderColor: "#007bff",
//   },
// };

// export default App;


//main before userlist
// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./Components/Login";
// import AdminDashboard from "./Components/AdminDashboard";
// import Admin from "./Components/Admin";
// import UsersList from "./Components/UsersList";
// import StoresList from "./Components/StoresList";
// import { db } from "./Components/firebase";
// import { collection, getDocs } from "firebase/firestore";
// import ChangePassword from "./Components/ChangePassword";
// import StoreDashboard from "./Components/StoreDashboard";
// import UserDashboard from "./Components/UserDashboard";

// const App = () => {
//   const [userData, setUserData] = useState([]);
//   const [storeData, setStoreData] = useState([]);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const fetchUsers = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "users"));
//       const usersList = querySnapshot.docs.map((doc) => doc.data());
//       setUserData(usersList);
//     } catch (error) {
//       console.error("Error fetching users: ", error);
//       alert("Failed to fetch users.");
//     }
//   };

//   const fetchStores = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "stores"));
//       const storesList = querySnapshot.docs.map((doc) => doc.data());
//       setStoreData(storesList);
//     } catch (error) {
//       console.error("Error fetching stores: ", error);
//       alert("Failed to fetch stores.");
//     }
//   };

//   const handleLogin = () => {
//     setIsAuthenticated(true);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//   };

//   return (
//     <Router>
//       <div style={{ padding: "20px" }}>
//         <Routes>
//           <Route path="/" element={<Login handleLogin={handleLogin} />} />
//           <Route
//             path="/admin-dash"
//             element={<AdminDashboard isAuthenticated={isAuthenticated} fetchUsers={fetchUsers} fetchStores={fetchStores} handleLogout={handleLogout} />}
//           />
//           <Route path="/admin" element={<Admin fetchUsers={fetchUsers} fetchStores={fetchStores} />} />
//           <Route path="/users" element={<UsersList users={userData} />} />
//           <Route path="/stores" element={<StoresList stores={storeData} />} />

//           <Route path="/store-dash" element={<StoreDashboard></StoreDashboard>} />
//           <Route path="/change-pass" element={<ChangePassword></ChangePassword>} />

//           <Route path="/user-dash" element={<UserDashboard stores={storeData}></UserDashboard>} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;


//************** */

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { db, auth } from "./Components/firebase";
import { collection, getDocs } from "firebase/firestore";
import Login from "./Components/Login";
import AdminDashboard from "./Components/AdminDashboard";
import Admin from "./Components/Admin";
import UsersList from "./Components/UsersList";
import StoresList from "./Components/StoresList";
import ChangePassword from "./Components/ChangePassword";
import UserDashboard from "./Components/UserDashboard";
import Rating from "./Components/Rating";
import StoreDashboard from "./Components/StoreDashboard";
import SignUp from "./Components/SignUp";
import Register from "./Components/Register";


const App = () => {
  const [userData, setUserData] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList = querySnapshot.docs.map((doc) => doc.data());
      setUserData(usersList);
    } catch (error) {
      console.error("Error fetching users: ", error);
      alert("Failed to fetch users.");
    }
  };

  const fetchStores = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "stores"));
      const storesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStoreData(storesList);
    } catch (error) {
      console.error("Error fetching stores: ", error);
      alert("Failed to fetch stores.");
    }
  };
 
    // Function to handle login status change
    const handleLogin = () => {
      setIsAuthenticated(true);
    };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Login handleLogin={() => setIsAuthenticated(true)} />} />
          <Route
            path="/admin-dash"
            element={
              <AdminDashboard
                isAuthenticated={isAuthenticated}
                fetchUsers={fetchUsers}
                fetchStores={fetchStores}
                userData={userData}
                storeData={storeData}
              />
            }
          />
          <Route path="/admin" element={<Admin fetchUsers={fetchUsers} fetchStores={fetchStores}  />} />
          <Route path="/users" element={<UsersList users={userData} />} />
          <Route path="/stores" element={<StoresList stores={storeData} />} />

          <Route path="/store-dash" element={<StoreDashboard></StoreDashboard>}></Route>
          <Route path="/change-pass" element={<ChangePassword />} />
          <Route path="/user-dash" element={<UserDashboard    isAuthenticated={isAuthenticated}  stores={storeData} userRatings={userRatings} />} />
          <Route path="/rate-store" element={<Rating stores={storeData} />} />
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="/login" element={<Register  handleLogin={handleLogin}></Register>}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;


// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./Components/Login";
// import AdminDashboard from "./Components/AdminDashboard";
// import UsersList from "./Components/UsersList";
// import StoresList from "./Components/StoresList";
// import { db } from "./Components/firebase";
// import { collection, getDocs, addDoc } from "firebase/firestore";
// import UserDashboard from "./Components/UserDashboard";

// const App = () => {
//   const [userData, setUserData] = useState([]);
//   const [storeData, setStoreData] = useState([]);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRatings, setUserRatings] = useState({}); // State to store ratings for users
//   const userId = "user123"; // Simulate a user ID for now, replace with actual user ID

//   // Fetch users from Firebase
//   const fetchUsers = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "users"));
//       const usersList = querySnapshot.docs.map((doc) => doc.data());
//       setUserData(usersList);
//     } catch (error) {
//       console.error("Error fetching users: ", error);
//     }
//   };

//   // Fetch stores from Firebase
//   const fetchStores = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "stores"));
//       const storesList = querySnapshot.docs.map((doc) => doc.data());
//       setStoreData(storesList);
//     } catch (error) {
//       console.error("Error fetching stores: ", error);
//     }
//   };

//   // Fetch user ratings from Firebase
//   const fetchUserRatings = async () => {
//     // Assuming ratings are stored in the "ratings" collection
//     try {
//       const querySnapshot = await getDocs(collection(db, "ratings"));
//       const ratingsList = querySnapshot.docs.reduce((acc, doc) => {
//         const data = doc.data();
//         if (data.userId === userId) {
//           acc[data.storeId] = data.rating;
//         }
//         return acc;
//       }, {});
//       setUserRatings(ratingsList);
//     } catch (error) {
//       console.error("Error fetching user ratings: ", error);
//     }
//   };

//   useEffect(() => {
//     fetchStores(); // Fetch stores on app initialization
//     fetchUserRatings(); // Fetch user ratings
//   }, []);

//   // Handle rating submission from UserDashboard
//   const handleRatingSubmit = async (storeId, newRating) => {
//     try {
//       // Add the rating to Firebase under the "ratings" collection
//       await addDoc(collection(db, "ratings"), {
//         userId: userId,
//         storeId: storeId,
//         rating: newRating,
//       });

//       setUserRatings((prevRatings) => ({
//         ...prevRatings,
//         [storeId]: newRating,
//       }));

//       alert("Rating submitted successfully!");
//     } catch (error) {
//       console.error("Error submitting rating: ", error);
//       alert("Failed to submit rating.");
//     }
//   };

//   return (
//     <Router>
//       <div style={{ padding: "20px" }}>
//         <Routes>
//           <Route path="/" element={<Login handleLogin={setIsAuthenticated} />} />
//           <Route path="/user-dash" element={
//             <UserDashboard
//               stores={storeData}
//               userRatings={userRatings}
//               handleRatingSubmit={handleRatingSubmit}
//             />
//           } />
//           {/* Other routes */}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;









// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
// import AdminDashboard from "./Components/AdminDashboard";
// import Admin from "./Components/Admin";
// import UsersList from "./Components/UsersList";
// import StoresList from "./Components/StoresList";
// import Login from "./Components/Login";
// import { db } from "./Components/firebase"; // Import your Firebase configuration
// import { collection, getDocs } from "firebase/firestore";

// const App = () => {
  // const [userData, setUserData] = useState([]);
  // const [storeData, setStoreData] = useState([]);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const fetchUsers = async () => {
  //   try {
  //     const querySnapshot = await getDocs(collection(db, "users"));
  //     const usersList = querySnapshot.docs.map((doc) => doc.data());
  //     setUserData(usersList);
  //   } catch (error) {
  //     console.error("Error fetching users: ", error);
  //     alert("Failed to fetch users.");
  //   }
  // };

  // const fetchStores = async () => {
  //   try {
  //     const querySnapshot = await getDocs(collection(db, "stores"));
  //     const storesList = querySnapshot.docs.map((doc) => doc.data());
  //     setStoreData(storesList);
  //   } catch (error) {
  //     console.error("Error fetching stores: ", error);
  //     alert("Failed to fetch stores.");
  //   }
  // };

  // const handleLogin = () => {
  //   setIsAuthenticated(true);
  // };

  // const handleLogout = () => {
  //   setIsAuthenticated(false);
  // };

//   return (
//     <Router>
//       <div style={{ padding: "20px" }}>
        // <h1>Admin Panel</h1>
        // {isAuthenticated && (
        //   <nav style={styles.nav}>
        //     <NavLink
        //       to="/"
        //       style={({ isActive }) =>
        //         isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink
        //       }
        //     >
        //       Dashboard
        //     </NavLink>
        //     <NavLink
        //       to="/admin"
        //       style={({ isActive }) =>
        //         isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink
        //       }
        //     >
        //       Add User/Store
        //     </NavLink>
        //     <NavLink
        //       to="/users"
        //       style={({ isActive }) =>
        //         isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink
        //       }
        //       onClick={fetchUsers}
        //     >
        //       View Users
        //     </NavLink>
        //     <NavLink
        //       to="/stores"
        //       style={({ isActive }) =>
        //         isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink
        //       }
        //       onClick={fetchStores}
        //     >
        //       View Stores
        //     </NavLink>
        //     <button style={styles.logoutButton} onClick={handleLogout}>
        //       Logout
        //     </button>
        //   </nav>
        // )}

//         <Routes>
//           {isAuthenticated ? (
//             <>
//               <Route path="/" element={<AdminDashboard />} />
//               <Route
//                 path="/admin"
//                 element={<Admin fetchUsers={fetchUsers} fetchStores={fetchStores} />}
//               />
              // <Route path="/users" element={<UsersList users={userData} />} />
              // <Route path="/stores" element={<StoresList stores={storeData} />} />
//             </>
//           ) : (
//             <Route path="/" element={<Login onLogin={handleLogin} />} />
//           )}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// const styles = {
//   nav: {
//     marginBottom: "20px",
//     display: "flex",
//     gap: "15px",
//     alignItems: "center",
//   },
//   navLink: {
//     textDecoration: "none",
//     color: "white",
//     fontSize: "22px",
//     fontWeight: "bold",
//     border: "1px solid #ccc",
//     padding: "5px 10px",
//     borderRadius: "4px",
//     background: "linear-gradient(to right,rgb(130, 138, 134),rgb(54, 192, 230))",
//     transition: "background-color 0.3s, color 0.3s",
//   },
//   activeNavLink: {
//     background: "linear-gradient(to right,rgb(9, 50, 68),rgb(50, 206, 249))",
//     color: "white",
//     borderColor: "#007bff",
//   },
//   logoutButton: {
//     padding: "5px 15px",
//     fontSize: "16px",
//     color: "white",
//     backgroundColor: "rgb(54, 192, 230)",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
// };

// export default App;

