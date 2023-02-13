import { useState } from 'react';
import logo from './logo.svg'

function NavBar({user, onLogin, onSearch}) {

  const [username, setUsername] = useState("")

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
            r.json().then((users) => {
              onSearch(users)
            })
          }
          else {
            r.json().then((err)=>console.log(err))
          }
        });
      }
  
    return (
    <header className="navbar-header"> 
        <a id='feed-link' href="/feed"><img src={logo} alt=""></img></a>
        <form onSubmit={handleSearch}>
        <input id="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
        </form>
        <a id='user-link' href="/"><h3>@{user.username}</h3></a>
        <button type="button" onClick={handleLogout}>logout</button> 
    </header>

    );
  }

  export default NavBar