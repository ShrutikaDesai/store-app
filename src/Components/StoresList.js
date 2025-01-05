// import React, { useState } from "react";
// import './StoresList.css'; // Import external CSS

// const StoresList = ({ stores }) => {
//   const [filters, setFilters] = useState({
//     name: "",
//     email: "",
//     address: "",
//     rating: "",
//   });

//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [name]: value,
//     }));
//   };

//   const handleSort = (key) => {
//     setSortConfig((prevSortConfig) => {
//       if (prevSortConfig.key === key) {
//         return { key, direction: prevSortConfig.direction === "asc" ? "desc" : "asc" };
//       }
//       return { key, direction: "asc" };
//     });
//   };

//   const sortedStores = [...stores].sort((a, b) => {
//     if (!sortConfig.key) return 0;
//     const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
//     const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";
//     if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
//     if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
//     return 0;
//   });

//   const filteredStores = sortedStores.filter((store) =>
//     Object.entries(filters).every(([key, value]) =>
//       value ? String(store[key])?.toLowerCase().includes(value.toLowerCase()) : true
//     )
//   );

//   const getSortIndicator = (key) => {
//     if (sortConfig.key === key) {
//       return sortConfig.direction === "asc" ? " ▲" : " ▼";
//     }
//     return "";
//   };

//   return (
//     <div className="container">
//       <h2>Stores List</h2>
//       <div className="filters">
//         <input
//           type="text"
//           name="name"
//           placeholder="Filter by Name"
//           value={filters.name}
//           onChange={handleFilterChange}
//           className="filter-input"
//         />
//         <input
//           type="text"
//           name="email"
//           placeholder="Filter by Email"
//           value={filters.email}
//           onChange={handleFilterChange}
//           className="filter-input"
//         />
//         <input
//           type="text"
//           name="address"
//           placeholder="Filter by Address"
//           value={filters.address}
//           onChange={handleFilterChange}
//           className="filter-input"
//         />
//         <input
//           type="text"
//           name="rating"
//           placeholder="Filter by Rating"
//           value={filters.rating}
//           onChange={handleFilterChange}
//           className="filter-input"
//         />
//       </div>
//       {filteredStores.length === 0 ? (
//         <p className="no-stores">No stores available.</p>
//       ) : (
//         <table className="stores-table">
//           <thead>
//             <tr>
//               <th onClick={() => handleSort("name")}>
//                 Name{getSortIndicator("name")}
//               </th>
//               <th onClick={() => handleSort("email")}>
//                 Email{getSortIndicator("email")}
//               </th>
//               <th onClick={() => handleSort("rating")}>
//                 Rating{getSortIndicator("rating")}
//               </th>
//               <th onClick={() => handleSort("address")}>
//                 Address{getSortIndicator("address")}
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredStores.map((store, index) => (
//               <tr key={index}>
//                 <td>{store.name}</td>
//                 <td>{store.email}</td>
//                 <td>{store.rating}</td>
//                 <td>{store.address}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default StoresList;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase"; // Firebase configuration
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import "./StoresList.css"; // Add any required CSS

const StoresList = () => {
  const [stores, setStores] = useState([]);
  const [editingStore, setEditingStore] = useState(null); // For editing
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const navigate = useNavigate(); // Initialize navigate hook

  // Fetch stores from Firebase
  const fetchStores = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "stores"));
      const storesList = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Keep original store ID
        ...doc.data(),
      }));
      setStores(storesList);
    } catch (error) {
      console.error("Error fetching stores: ", error);
      alert("Failed to fetch stores.");
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  // Handle delete action
  const handleDelete = async (storeId) => {
    try {
      await deleteDoc(doc(db, "stores", storeId));
      setStores(stores.filter(store => store.id !== storeId)); // Remove store from list
    } catch (error) {
      console.error("Error deleting store: ", error);
      alert("Failed to delete store.");
    }
  };

  // Handle edit action
  const handleEdit = (store) => {
    setEditingStore(store); // Set the store to edit
  };

  // Handle update action
  const handleUpdate = async (e) => {
    e.preventDefault();
    const { name, email, address, rating } = editingStore;

    try {
      const storeRef = doc(db, "stores", editingStore.id);
      await updateDoc(storeRef, { name, email, address, rating });
      setStores(stores.map(store => store.id === editingStore.id ? editingStore : store)); // Update store in list
      setEditingStore(null); // Clear edit form
    } catch (error) {
      console.error("Error updating store: ", error);
      alert("Failed to update store.");
    }
  };

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter stores
  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="stores-container">
      <button className="back-button" onClick={() => navigate("/admin-dash")}>
        Back
      </button>

      {/* Search box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by Name, Email, or Address"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Edit form */}
      {editingStore && (
        <form onSubmit={handleUpdate} className="edit-form">
          <h2>Edit Store</h2>
          <input
            type="text"
            value={editingStore.name}
            onChange={(e) => setEditingStore({ ...editingStore, name: e.target.value })}
            placeholder="Store Name"
          />
          <input
            type="email"
            value={editingStore.email}
            onChange={(e) => setEditingStore({ ...editingStore, email: e.target.value })}
            placeholder="Store Email"
          />
          <input
            type="text"
            value={editingStore.address}
            onChange={(e) => setEditingStore({ ...editingStore, address: e.target.value })}
            placeholder="Store Address"
          />
          <input
            type="text"
            value={editingStore.rating}
            onChange={(e) => setEditingStore({ ...editingStore, rating: e.target.value })}
            placeholder="Store Rating"
          />
          <button type="submit">Update</button>
          <button type="button" onClick={() => setEditingStore(null)}>Cancel</button>
        </form>
      )}

      <table className="stores-table">
        <thead>
          <tr>
            <th>Store ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStores.map((store, index) => (
            <tr key={store.id}>
              <td>{index + 1}</td> {/* Sequential ID */}
              <td>{store.name}</td>
              <td>{store.email}</td>
              <td>{store.address}</td>
              <td>{store.rating ?? "N/A"}</td>
              <td>
                <button onClick={() => handleEdit(store)}>Edit</button>
                <button onClick={() => handleDelete(store.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoresList;
