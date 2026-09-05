import React, { useState } from 'react';

// GroceryTrack - To-Do List Starter Component
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>GroceryTrack To-Do List</h2>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add new task..."
          style={{ padding: '8px', width: '70%', marginRight: '5px' }}
        />
        <button type="submit" style={{ padding: '8px 12px' }}>Add</button>
      </form>
      <ul style={{ marginTop: '20px', listStyleType: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
