
import './App.css';
import "./input.css"
import ToDoList from './Projects/TodoList';
import RecipeApp from './Projects/RecipeMaker';
import { Route,Router,Link,Routes } from 'react-router-dom';
import { RouteLink } from './Projects/RoutingBoth';



function App() {
  return (
    <div className="App">
     
           <ToDoList/>
           <RecipeApp/>
        

    </div>
  );
}

export default App;
