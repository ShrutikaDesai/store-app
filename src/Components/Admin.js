// import React, { useState } from "react";
// import { db } from "./firebase"; // Import your Firebase configuration
// import { collection, addDoc } from "firebase/firestore";

// const Admin = () => {
//   const [formType, setFormType] = useState("user"); // 'user' or 'store'
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "Normal User",
//     address: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (formType === "user") {
//         await addDoc(collection(db, "users"), {
//           name: formData.name,
//           email: formData.email,
//           password: formData.password, // Consider hashing passwords for security!
//           role: formData.role,
//           address: formData.address,
//         });
//         alert("User added successfully!");
//       } else {
//         await addDoc(collection(db, "stores"), {
//           name: formData.name,
//           email: formData.email,
//           address: formData.address,
//         });
//         alert("Store added successfully!");
//       }
//       setFormData({ name: "", email: "", password: "", role: "Normal User", address: "" }); // Reset form
//     } catch (error) {
//       console.error("Error adding document: ", error);
//       alert("Failed to add. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <h1>Add {formType === "user" ? "User" : "Store"}</h1>
//       <button onClick={() => setFormType("user")}>Add User</button>
//       <button onClick={() => setFormType("store")}>Add Store</button>

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             maxLength="60"
//             minLength="10"
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         {formType === "user" && (
//           <>
//             <div>
//               <label>Password:</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 // pattern="^(?=.*[A-Z])(?=.*\\W).{3,16}$"
//               />
//             </div>
//             <div>
//               <label>Role:</label>
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="Normal User">Normal User</option>
//                 <option value="Admin User">Admin User</option>
//                 <option value="Store Owner">Store Owner</option>
//               </select>
//             </div>
//           </>
//         )}
//         <div>
//           <label>Address:</label>
//           <textarea
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//             maxLength="400"
//           ></textarea>
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Admin;



//main before add rating

// import React, { useState } from "react";
// import { db } from "./firebase"; // Import your Firebase configuration
// import { collection, addDoc, getDocs } from "firebase/firestore";

// const Admin = () => {
//   const [formType, setFormType] = useState("user"); // 'user' or 'store'
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "Normal User",
//     address: "",
//   });
//   const [userData, setUserData] = useState([]);
//   const [storeData, setStoreData] = useState([]);
//   const [showUsers, setShowUsers] = useState(false);
//   const [showStores, setShowStores] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (formType === "user") {
//         await addDoc(collection(db, "users"), {
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//           role: formData.role,
//           address: formData.address,
//         });
//         alert("User added successfully!");
//       } else {
//         await addDoc(collection(db, "stores"), {
//           name: formData.name,
//           email: formData.email,
//           address: formData.address,
//         });
//         alert("Store added successfully!");
//       }
//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//         role: "Normal User",
//         address: "",
//       });
//     } catch (error) {
//       console.error("Error adding document: ", error);
//       alert("Failed to add. Please try again.");
//     }
//   };

  // const fetchUsers = async () => {
  //   try {
  //     const querySnapshot = await getDocs(collection(db, "users"));
  //     const usersList = querySnapshot.docs.map((doc) => doc.data());
  //     setUserData(usersList);
  //     setShowUsers(true);
  //     setShowStores(false);
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
  //     setShowStores(true);
  //     setShowUsers(false);
  //   } catch (error) {
  //     console.error("Error fetching stores: ", error);
  //     alert("Failed to fetch stores.");
  //   }
  // };

//   return (
//     <div>
//       <h1>Add {formType === "user" ? "User" : "Store"}</h1>
//       <button onClick={() => setFormType("user")}>Add User</button>
//       <button onClick={() => setFormType("store")}>Add Store</button>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//         </div>
//         {formType === "user" && (
//           <>
//             <div>
//               <label>Password:</label>
//               <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//             </div>
//             <div>
//               <label>Role:</label>
//               <select name="role" value={formData.role} onChange={handleChange}>
//                 <option value="Normal User">Normal User</option>
//                 <option value="Admin User">Admin User</option>
//                 <option value="Store Owner">Store Owner</option>
//               </select>
//             </div>
//           </>
//         )}
//         <div>
//           <label>Address:</label>
//           <textarea name="address" value={formData.address} onChange={handleChange} required />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//       <button onClick={fetchUsers}>Fetch Users</button>
//       <button onClick={fetchStores}>Fetch Stores</button>
//       {showUsers && (
//         <ul>
//           {userData.map((user, index) => (
//             <li key={index}>Name: {user.name}, Email: {user.email}</li>
//           ))}
//         </ul>
//       )}
//       {showStores && (
//         <ul>
//           {storeData.map((store, index) => (
//             <li key={index}>Name: {store.name}, Email: {store.email}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Admin;


import React, { useState } from "react";
import { db } from "./firebase"; // Import your Firebase configuration
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const Admin = ({ fetchUsers, fetchStores }) => {
  const [formType, setFormType] = useState("user"); // 'user' or 'store'
  const navigate = useNavigate(); // Initialize navigate hook
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Normal User",
    address: "",
    rating: "",
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


   
    try {
      if (formType === "user") {
        await addDoc(collection(db, "users"), {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          address: formData.address,
        });
        alert("User added successfully!");
        fetchUsers();
      } else {
        await addDoc(collection(db, "stores"), {
          name: formData.name,
          email: formData.email,
          address: formData.address,
          rating: parseFloat(formData.rating),
        });
        alert("Store added successfully!");
        fetchStores();
      }

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "Normal User",
        address: "",
        rating: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to add. Please try again.");
    }
    fetchStores();
  };

  return (
    <div className="container">
       <button className="back-button" onClick={() => navigate("/admin-dash")}>
  Back
</button>
      <h1 className="heading">Add {formType === "user" ? "User" : "Store"}</h1>
      <div className="formTypeButtons">
        <button className="button" onClick={() => setFormType("user")}>
          Add User
        </button>
        <button className="button" onClick={() => setFormType("store")}>
          Add Store
        </button>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label className="label">Name:</label>
          <input
            className="input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="label">Email:</label>
          <input
            className="input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {formType === "user" && (
          <>
            <div>
              <label className="label">Password:</label>
              <input
                className="input"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="label">Role:</label>
              <select
                className="select"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Normal User">Normal User</option>
                <option value="Admin User">Admin User</option>
                <option value="Store Owner">Store Owner</option>
              </select>
            </div>
          </>
        )}

        {formType === "store" && (
          <div>
            <label className="label">Rating:</label>
            <input
              className="input"
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
              min="0"
              max="5"
              step="0.1"
            />
          </div>
        )}

        <div>
          <label className="label">Address:</label>
          <textarea
            className="textarea"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Admin;
