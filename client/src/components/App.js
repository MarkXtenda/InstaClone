import logo from './logo.svg';
import './App.css';
import HomePage from './HomePage'
import Feed from './Feed'
import Login from "./Login";
import Post from "./Post";
import Signup from './Signup';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';


function App() {

  const [loged, setLoged] = useState(false) /* log in method */

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          console.log(user)
          setLoged(user)});
      }
    });
  }, []);
  
  if (!loged) return <Login onLogin={setLoged} />;

  return (
    <div className="App">
      <main>
      <Feed user={loged} onLogin={setLoged}/>
      </main>
      <Routes>
        <Route path="/" element={<HomePage onLogin={setLoged}/>}></Route>
        <Route path="/feed" element={<Feed />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
