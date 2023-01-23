import logo from './logo.svg';
import './App.css';
import HomePage from './HomePage'
import Feed from './Feed'
import Login from "./Login";
import Post from "./Post";
import Signup from './Signup';
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/feed" element={<Feed />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
