import logo from './logo.svg'

function NavBar({user, onLogin}) {
    function handleLogout() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            onLogin(null);
          }
        });
      }
  
    return (
    <header className="user-section"> 
        <a href="/feed"><img src={logo} style={{height: "50px", width: "50px"}} alt=""></img></a>
        <input></input>
        <a href="/"><h3>@{user.username}</h3></a>
        <button onClick={handleLogout}>logout</button> 
    </header>

    );
  }

  export default NavBar