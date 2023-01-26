import logo from './logo.svg';
import './HomePage.css';

function Feed({user, onLogin}) {

    function handleLogout() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            onLogin(null);
          }
        });
      }

    const posts = []
    for (let i = 0; i < 6; i++) {
        posts.push(i)

    }
    return(
        <div className = "feed">
            <header className="user-section"> 
                <img src={logo} style={{height: "50px", width: "50px"}} alt=""></img>
                <input></input>
                <h3>@{user.username}</h3>
                <button onClick={handleLogout}>logout</button>
            </header>
            <div>{posts.map((element)=><img key={element} src={logo} alt=""></img>)}</div>
        </div>
    );
}

export default Feed;