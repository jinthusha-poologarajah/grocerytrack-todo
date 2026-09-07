import { useState } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  const addTask = (e) => {
    e.preventDefault()

    if (task.trim() === '') {
      return
    }

    setTasks([...tasks, task])
    setTask('')
  }

  return (
    <div className="app">
      <h1>My To-Do List</h1>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default App