import logo from './logo.svg';
import './App.css';
import HomePage from './HomePage'
import Feed from './Feed'
import Login from "./Login";
import Post from "./Post";
import Signup from './Signup';
import { Switch, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Signup></Signup>
    </div>
  );
}

export default App;
