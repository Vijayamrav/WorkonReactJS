

import ToDoList from './Projects/TodoList';
import RecipeApp from './Projects/RecipeMaker';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
      <div className="App">
      <nav className="bg-gray-800 p-4 flex justify-center space-x-4">
        <Link
          to="/"
          className="text-white px-4 py-2 border-2 border-sky-500 bg-cyan-500 rounded-md hover:bg-cyan-600 transition duration-200"
        >
          To-Do List
        </Link>
        <Link
          to="/recipes"
          className="text-white px-4 py-2 border-2 border-sky-500 bg-cyan-500 rounded-md hover:bg-cyan-600 transition duration-200"
        >
          Recipe App
        </Link>
      </nav>

        <Routes>
          <Route path="/" element={<ToDoList />} />
          <Route path="/recipes" element={<RecipeApp />} />
        </Routes>
      </div>
    </Router>
    </>
    
  );
}

export default App;
