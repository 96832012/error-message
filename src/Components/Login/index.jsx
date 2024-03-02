import { useState } from "react";
import ErrorMessage from "../ErrorMessage";

export const Login = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null); // State to store the ID of the item being edited
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !surname || !email) return;

    if (editingItemId !== null) {
      // If an item is being edited, update its values directly
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === editingItemId ? { ...item, name, surname, email } : item
        )
      );
      setEditingItemId(null); // Reset editing state
    } else {
      if (checkIfAccountExists(email)) {
        setError("An account with this email already exists.");
      } else {
        const newItem = {
          name,
          surname,
          email,
          id: Date.now(),
        };

        setItems([...items, newItem]);

        setName("");
        setSurname("");
        setEmail("");
      }
    }

    function checkIfAccountExists(email) {
      return items.some((item) => item.email === email);
    }
  }

  function handleEdit(item) {
    // Set the values of the selected item to the input fields
    setName(item.name);
    setSurname(item.surname);
    setEmail(item.email);
    setEditingItemId(item.id); // Set the ID of the item being edited
  }

  function handleDelete(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Write your Name, Surname & Email</h3>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">
          {editingItemId !== null ? "Update" : "Add"}
        </button>{" "}
        {/* Change button text based on edit state */}
        {error && <ErrorMessage message={error} />}
      </form>

      <ul className="list">
        {items.map((item) => (
          <li key={item.id} className="list-el">
            <span>
              {item.name} {item.surname} {item.email}
            </span>
            <span className="buttons-list">
              <button onClick={() => handleDelete(item.id)}>Delete</button>
              <button onClick={() => handleEdit(item)}>✏️</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
