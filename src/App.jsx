import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    const trimmedInput = input.trim();

    if (trimmedInput === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: trimmedInput,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  const remainingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  return (
    <div className="app">
      <div className="todo-container">

        <header className="todo-header">
          <h1>My Todo List</h1>
          <p>Stay organized. Get things done.</p>
        </header>

        <div className="input-section">
          <input
            type="text"
            placeholder="What do you need to do?"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button onClick={addTask}>
            Add Task
          </button>
        </div>

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

        <div className="task-list">

          {filteredTasks.length === 0 ? (
            <div className="empty-message">
              <div className="empty-icon">✓</div>
              <p>No tasks here.</p>
              <span>Add a task to get started.</span>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                className={`task-item ${
                  task.completed ? "completed" : ""
                }`}
                key={task.id}
              >
                <div className="task-left">

                  <button
                    className="check-button"
                    onClick={() => toggleTask(task.id)}
                    aria-label="Complete task"
                  >
                    {task.completed ? "✓" : ""}
                  </button>

                  <span className="task-text">
                    {task.text}
                  </span>

                </div>

                <button
                  className="delete-button"
                  onClick={() => deleteTask(task.id)}
                  aria-label="Delete task"
                >
                  Delete
                </button>
              </div>
            ))
          )}

        </div>

        <div className="todo-footer">

          <span>
            {remainingTasks}{" "}
            {remainingTasks === 1 ? "task" : "tasks"} remaining
          </span>

          <button onClick={clearCompleted}>
            Clear completed
          </button>

        </div>

      </div>
    </div>
  );
}

export default App;


