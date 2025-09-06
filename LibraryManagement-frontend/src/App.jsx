import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "./config"; // 🔥 Import config

function App() {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    price: "",
    genre: "",
  });

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/all`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open dialog for Add/Edit
  const handleOpen = (book = null) => {
    setEditingBook(book);
    if (book) {
      setFormData(book);
    } else {
      setFormData({ title: "", author: "", isbn: "", price: "", genre: "" });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // Save (Add or Update)
  const handleSave = async () => {
    try {
      if (editingBook) {
        await axios.put(`${config.API_URL}/update/${editingBook.id}`, formData);
      } else {
        await axios.post(`${config.API_URL}/add`, formData);
      }
      fetchBooks();
      handleClose();
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  // Delete a book
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.API_URL}/delete/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>📚 Books Management</h1>

      <button
        onClick={() => handleOpen()}
        style={{
          padding: "10px 20px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ➕ Add Book
      </button>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f4f4f4", textAlign: "left" }}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Author</th>
            <th style={thStyle}>ISBN</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Genre</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr
              key={book.id}
              style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}
            >
              <td style={tdStyle}>{book.id}</td>
              <td style={tdStyle}>{book.title}</td>
              <td style={tdStyle}>{book.author}</td>
              <td style={tdStyle}>{book.isbn}</td>
              <td style={tdStyle}>${book.price}</td>
              <td style={tdStyle}>{book.genre}</td>
              <td style={tdStyle}>
                <button
                  onClick={() => handleOpen(book)}
                  style={editBtn}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  style={deleteBtn}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog for Add/Edit */}
      {open && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h2>{editingBook ? "Edit Book" : "Add Book"}</h2>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="ISBN"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              style={inputStyle}
            />
            <div style={{ marginTop: "15px", textAlign: "right" }}>
              <button onClick={handleClose} style={cancelBtn}>
                Cancel
              </button>
              <button onClick={handleSave} style={saveBtn}>
                {editingBook ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline Styles
const thStyle = { padding: "10px", borderBottom: "2px solid #ddd" };
const tdStyle = { padding: "10px" };

const editBtn = {
  marginRight: "10px",
  padding: "5px 10px",
  background: "#ffc107",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const deleteBtn = {
  padding: "5px 10px",
  background: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContent = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "8px 0",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const cancelBtn = {
  padding: "8px 15px",
  background: "#6c757d",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "10px",
};

const saveBtn = {
  padding: "8px 15px",
  background: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default App;
