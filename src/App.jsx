import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  // Add a new task
  const addTodo = () => {
    if (task.trim() === "" || date === "") {
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: task,
      date: date,
      completed: false,
    };

    setTodos([...todos, newTodo]);

    // Clear input fields
    setTask("");
    setDate("");
  };

  // Complete / uncomplete a task
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // Delete a task
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Filter tasks
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    }

    if (filter === "completed") {
      return todo.completed;
    }

    return true;
  });

  // Clear completed tasks
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // Count active tasks
  const remainingTasks = todos.filter(
    (todo) => !todo.completed
  ).length;

  return (
    <div className="app">
      <div className="todo-container">

        {/* Header */}
        <div className="todo-header">
          <h1>My Todo List</h1>
          <p>Organize your tasks and stay productive.</p>
        </div>

        {/* Input section */}
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(event) => setTask(event.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />

          <button onClick={addTodo}>Add</button>
        </div>

        {/* Filter buttons */}
        <div className="filter-section">
          <button
            className={filter === "all" ? "active-filter" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "active" ? "active-filter" : ""}
            onClick={() => setFilter("active")}
          >
            Active
          </button>

          <button
            className={filter === "completed" ? "active-filter" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        {/* Task list */}
        <div className="task-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-message">
              <div className="empty-icon">✓</div>
              <p>No tasks yet</p>
              <span>Add a task to get started.</span>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div
                className={`task-item ${
                  todo.completed ? "completed" : ""
                }`}
                key={todo.id}
              >
                <div className="task-left">

                  {/* Complete button */}
                  <button
                    className="check-button"
                    onClick={() => toggleTodo(todo.id)}
                  >
                    {todo.completed ? "✓" : ""}
                  </button>

                  {/* Task information */}
                  <div>
                    <div className="task-text">
                      {todo.text}
                    </div>

                    <small className="task-date">
                      📅 {todo.date}
                    </small>
                  </div>
                </div>

                {/* Delete button */}
                <button
                  className="delete-button"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {todos.length > 0 && (
          <div className="todo-footer">
            <span>
              {remainingTasks} task
              {remainingTasks !== 1 ? "s" : ""} remaining
            </span>

            <button onClick={clearCompleted}>
              Clear completed
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;

