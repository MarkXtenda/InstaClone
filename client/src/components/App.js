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
import FollowersFollowings from './FollowersFollowings';
import PageNotFound from './static/PageNotFound'
import Loading from './static/Loading';

function App() {
  const followers = "followers"
  const followings = "followings"
  const [user, setUser] = useState(false) /* log in method */
  const [search, setSearch] = useState([])
  const [signup, setSignup] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)});
          setIsLoading(false)
      }
      else {
        setIsLoading(false)
      }
    });
  }, []);
  
  // if (!user) return(signup ? (<Signup onSignup={setSignup}/>) : (<Login onLogin={setUser} onSignup={setSignup}/>));
  if (!user && !isLoading) return(!signup ? <Login onLogin={setUser} onSignup={setSignup}/> : <Signup onSignup={setSignup}/>);

  if (isLoading) return(<Loading/>);

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
        <Route  path="/users/:id" element={<UserPage logedInUser={user} userId={user.id} searched = {search} />}></Route>
        <Route path="/:id/followers" element={<FollowersFollowings userId={user.id} keyword={followers} />}></Route>
        <Route path="/:id/followings" element={<FollowersFollowings userId={user.id} keyword={followings}/>}></Route>
        <Route path='*' element={<PageNotFound/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
