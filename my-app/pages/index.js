import React, { useState, useEffect } from 'react';

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState(null);

  // Function to fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data.data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Function to add a new task
  const addTask = async () => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTask }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setNewTask('');
      fetchTasks();
    } catch (error) {
      setError(error.message);
    }
  };

  // Function to toggle task completion
  const toggleCompletion = async (id, completed) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      });
      fetchTasks();
    } catch (error) {
      setError(error.message);
    }
  };

  // Function to delete a task
  const deleteTask = async (id) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      fetchTasks();
    } catch (error) {
      setError(error.message);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Tasks</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      {error && <p>Error: {error}</p>}

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.completed ? 'Done' : 'Pending'}
            <button onClick={() => toggleCompletion(task._id, task.completed)}>
              Toggle Completion
            </button>
            <button onClick={() => deleteTask(task._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
