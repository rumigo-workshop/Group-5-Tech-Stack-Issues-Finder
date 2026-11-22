
import { useState } from "react";
import "./App.css";

const initialBooks = [
  { id: 1, title: "Atomic Habits", author: "James Clear", year: 2018 },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
  { id: 3, title: "Clean Code", author: "Robert C. Martin", year: 2008 },
];

function App() {
  const [books, setBooks] = useState(initialBooks);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  function fetchBooks() {
    setBooks([...initialBooks]);
    setMessage("Sample books fetched successfully!");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editingId !== null) {
      setBooks((previous) =>
        previous.map((book) =>
          book.id === editingId
            ? { ...book, title, author, year: Number(year) }
            : book
        )
      );
      setMessage("Book updated successfully!");
      setEditingId(null);
    } else {
      const newBook = {
        id: Date.now(),
        title,
        author,
        year: Number(year),
      };

      setBooks((previous) => [...previous, newBook]);
      setMessage("Book added successfully!");
    }

    setTitle("");
    setAuthor("");
    setYear("");
  }

  function editBook(book) {
    setEditingId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setYear(String(book.year));
    setMessage(`Editing: ${book.title}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function deleteBook(id) {
    setBooks((previous) => previous.filter((book) => book.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setTitle("");
      setAuthor("");
      setYear("");
    }
    setMessage("Book deleted successfully!");
  }

  function cancelEdit() {
    setEditingId(null);
    setTitle("");
    setAuthor("");
    setYear("");
    setMessage("");
  }

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>Book Management System</h1>
          <p>Manage your book collection easily</p>
        </div>
        <button className="fetch-btn" onClick={fetchBooks}>
          Fetch Books
        </button>
      </div>

      <div className="form-section">
        <h2>{editingId !== null ? "Edit Book" : "Add New Book"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Publication Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />

          <button type="submit">
            {editingId !== null ? "Update Book" : "Add Book"}
          </button>

          {editingId !== null && (
            <button
              type="button"
              className="cancel-btn"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="list-header">
        <h2>Books List</h2>
        <span>{books.length} Books</span>
      </div>

      {books.length === 0 ? (
        <p className="empty">No books available.</p>
      ) : (
        <div className="book-list">
          {books.map((book) => (
            <div className="book-card" key={book.id}>
              <div className="book-details">
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Publication Year: {book.year}</p>
              </div>

              <div className="actions">
                <button
                  className="edit-btn"
                  onClick={() => editBook(book)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteBook(book.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
