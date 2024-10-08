// ToDoList.js
import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './todolist.css'; // Ensure you have appropriate styles

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Temporary storage for dragged item index
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  // Function to add a new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskInput.trim()) {
      setTasks([
        ...tasks,
        { id: `task-${Date.now()}`, text: taskInput, completed: false },
      ]);
      setTaskInput('');
    }
  };

  // Function to toggle task completion
  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const updatedTask = { ...task, completed: !task.completed };
        if (updatedTask.completed) {
          // Show confetti
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 4000); // Confetti duration

          // Trigger toast notification with corrected position
          toast.success(`Task "${updatedTask.text}" completed! 🎉`, {
            position: "top-right", // Use string instead of toast.POSITION.TOP_RIGHT
            autoClose: 3000, // Duration in milliseconds
          });
        }
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Handle drag start
  const handleDragStart = (index) => (e) => {
    setDraggedItemIndex(index);
    // Optional: Add visual feedback
    e.dataTransfer.effectAllowed = 'move';
    // For Firefox compatibility
    e.dataTransfer.setData('text/html', e.target.innerHTML);
    // You can set a drag image if desired
    // e.dataTransfer.setDragImage(e.target, 0, 0);
  };

  // Handle drag over
  const handleDragOver = (index) => (e) => {
    e.preventDefault(); // Necessary to allow a drop
    e.dataTransfer.dropEffect = 'move';
  };

  // Handle drop
  const handleDrop = (index) => (e) => {
    e.preventDefault();
    const draggedOverItemIndex = index;

    if (draggedItemIndex === null || draggedItemIndex === draggedOverItemIndex) {
      return;
    }

    // Clone the tasks array
    const updatedTasks = [...tasks];
    // Remove the dragged item
    const draggedItem = updatedTasks.splice(draggedItemIndex, 1)[0];
    // Insert the dragged item at the new position
    updatedTasks.splice(draggedOverItemIndex, 0, draggedItem);

    setTasks(updatedTasks);
    setDraggedItemIndex(null);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

  // Filter tasks based on current filter
  const getFilteredTasks = () => {
    if (filter === 'completed') return tasks.filter((task) => task.completed);
    if (filter === 'pending') return tasks.filter((task) => !task.completed);
    return tasks;
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">To-Do List</h1>
      <form onSubmit={handleAddTask} className="mb-4 flex">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
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
          className={`p-2 rounded-lg ${
            filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`p-2 rounded-lg ${
            filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`p-2 rounded-lg ${
            filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Completed
        </button>
      </div>
      <ul className="list-none pl-0">
        {getFilteredTasks().map((task, index) => (
          <li
            key={task.id}
            draggable
            onDragStart={handleDragStart(index)}
            onDragOver={handleDragOver(index)}
            onDrop={handleDrop(index)}
            onDragEnd={handleDragEnd}
            className={`tasklist relative mb-2 p-2 rounded-lg cursor-pointer text-lg ${
              task.completed
                ? 'bg-green-200 line-through'
                : 'bg-gray-100 hover:bg-gray-200 transition duration-200'
            }`}
            onClick={() => toggleTaskCompletion(task.id)}
          >
            {task.text}
          </li>
        ))}
      </ul>
      {showConfetti && <Confetti />}
      {/* ToastContainer for react-toastify */}
      <ToastContainer />
    </div>
  );
};

export default ToDoList;
