import logo from './logo.svg';
import './App.css';
import HomePage from './HomePage'
import Feed from './Feed'
import Login from "./Login";
import Post from "./Post";
import Signup from './Signup';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import NavBar from './NavBar';


function App() {

  const [user, setUser] = useState(false) /* log in method */
  const [path, setPath] = useState(0)

  // function handlePostPath(path) {
  //   setPath(path)
  // }
  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          console.log(user)
          setUser(user)});
      }
    });
  }, []);
  
  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="App">
      <NavBar user={user} onLogin={setUser} ></NavBar>
      <Routes>
        <Route path="/feed" element={<Feed user={user}/>}></Route>
        <Route path="/" element={<HomePage user={user} onLogin={setUser}/>}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route  path="/posts/:id" element={<Post />}></Route>
      </Routes>
    </div>
  );
}

export default App;
