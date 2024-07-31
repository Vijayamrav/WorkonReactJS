import React, { useState } from 'react';
import { useRef } from 'react';
import Confetti from 'react-confetti';
import "./todolist.css"

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef=useRef(null);

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">To-Do List</h1>
      <form onSubmit={handleAddTask} className="mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
          className="border border-gray-300 p-2 rounded-lg w-full"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>
      <div className="mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`mr-2 p-2 rounded-lg ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`mr-2 p-2 rounded-lg ${filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`p-2 rounded-lg ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Completed
        </button>
      </div>
      <ul className="list-disc pl-5">
        {filteredTasks.map((task, index) => (
          <li
            key={index}
            className={` tasklist relative mb-2 p-2 rounded-lg cursor-pointer text-lg ${task.completed ? 'bg-green-200 line-through' : 'bg-gray-100'}`}
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
