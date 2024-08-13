import React, { useState, useRef } from 'react';
import Confetti from 'react-confetti';
import "./todolist.css"

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [showConfetti, setShowConfetti] = useState(false);
  

  const handleAddTask = (e) => {
    e.preventDefault();
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.slice();
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);

    if (newTasks[index].completed) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000); // Confetti duration
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">To-Do List</h1>
      <form onSubmit={handleAddTask} className="mb-4 flex">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
          className="border border-gray-300 p-2 rounded-l-lg w-full focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition duration-200"
        >
          Add
        </button>
      </form>
      <div className="mb-4 flex justify-center space-x-2">
        <button
          onClick={() => setFilter('all')}
          className={`p-2 rounded-lg ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`p-2 rounded-lg ${filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`p-2 rounded-lg ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          Completed
        </button>
      </div>
      <ul className="list-none pl-0">
        {filteredTasks.map((task, index) => (
          <li
            key={index}
            className={`tasklist relative mb-2 p-2 rounded-lg cursor-pointer text-lg ${task.completed ? 'bg-green-200 line-through' : 'bg-gray-100 hover:bg-gray-200 transition duration-200'}`}
            onClick={() => toggleTaskCompletion(index)}
          >
            {task.text}
          </li>
        ))}
      </ul>
      {showConfetti && <Confetti />}
    </div>
  );
};

export default ToDoList;
