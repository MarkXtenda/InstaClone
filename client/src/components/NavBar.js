import { useState } from 'react';
import logo from './logo.svg'

function NavBar({user, onLogin, onSearch}) {

  const [username, setUsername] = useState("")
  const [errors, setErrors] = useState([])
  const [findUsers, setFindUsers] = useState([])

    function handleLogout() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            onLogin(null);
          }
        });
      }

    function handleSearch(e) {
      e.preventDefault();
      fetch(`/follow/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
        }),
      })
        .then((r) => {
          if(r.ok) {
            setErrors([])
            r.json().then((users) => {
              onSearch(users)
            })
          }
          else {
            r.json().then((err)=>setErrors(err))
          }
        });
      }
  
    return (
    <header className="user-section"> 
        <a href="/feed"><img src={logo} style={{height: "50px", width: "50px"}} alt=""></img></a>
        <form onSubmit={handleSearch}>
        <input id="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
        </form>
        <a href="/"><h3>@{user.username}</h3></a>
        <button onClick={handleLogout}>logout</button> 
    </header>

    );
  }

  export default NavBar