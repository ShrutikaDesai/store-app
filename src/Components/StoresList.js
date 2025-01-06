import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase"; // Firebase configuration
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import "./StoresList.css"; // Add any required CSS

const StoresList = () => {
  const [stores, setStores] = useState([]);
  const [editingStore, setEditingStore] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const navigate = useNavigate(); 

  
  const fetchStores = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "stores"));
      const storesList = querySnapshot.docs.map((doc) => ({
        id: doc.id, 
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

  const handleDelete = async (storeId) => {
    try {
      await deleteDoc(doc(db, "stores", storeId));
      setStores(stores.filter(store => store.id !== storeId)); 
    } catch (error) {
      console.error("Error deleting store: ", error);
      alert("Failed to delete store.");
    }
  };

  const handleEdit = (store) => {
    setEditingStore(store); 
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { name, email, address, rating } = editingStore;

    try {
      const storeRef = doc(db, "stores", editingStore.id);
      await updateDoc(storeRef, { name, email, address, rating });
      setStores(stores.map(store => store.id === editingStore.id ? editingStore : store)); 
      setEditingStore(null); 
    } catch (error) {
      console.error("Error updating store: ", error);
      alert("Failed to update store.");
    }
  };

 
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter stores based on search term
  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
          <h1>Stores List</h1>
      <button className="back-button" onClick={() => navigate("/admin-dash")}>
        Back
      </button>

     
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by Name, Email, or Address"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>


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
              <td>{index + 1}</td> 
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
