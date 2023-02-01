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
import SearchUser from './SearchUser'
import UserPage from './UserPage'

function App() {

  const [user, setUser] = useState(false) /* log in method */
  const [search, setSearch] = useState([])
  const [signup, setSignup] = useState(false)

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)});
      }
    });
  }, []);
  
  // if (!user) return(signup ? (<Signup onSignup={setSignup}/>) : (<Login onLogin={setUser} onSignup={setSignup}/>));
  if (!user) return(<Login onLogin={setUser} />);

  return (
    <div className="App">
      <NavBar user={user} onLogin={setUser} onSearch={setSearch} ></NavBar>
      {search.length > 0 && <SearchUser users={search} clearSearch={setSearch}></SearchUser>}
      <Routes>
        <Route path="/feed" element={<Feed user={user}/>}></Route>
        <Route path="/" element={<HomePage user={user} onLogin={setUser}/>}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route  path="/posts/:id" element={<Post />}></Route>
        <Route  path="/users/:id" element={<UserPage userId={user.id} searched = {search} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
