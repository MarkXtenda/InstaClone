import logo from './logo.svg';
import { useState } from 'react';

function Login({onLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([])

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        })
        .then((r) => {
          if(r.ok) {
            setErrors([])
            r.json().then((user) => {
              onLogin(user)
              console.log(`User: ${user.username} has been logged in`)})
          }
          else {
            r.json().then((err)=> setErrors(err.errors))
          }
        });
      }

    return(
        <div className = "Login">
            <header style={{display: "flex", flexDirection: "column", padding: "100px 500px"}}> 
                <section><img src={logo} style={{height: "50px", width: "50px"}} alt=""></img>Instaclone</section>
                <form 
                onSubmit={handleSubmit}
                style={{display: "flex", flexDirection: "column", margin: "50px 50px"}}>
            
                {/* fetch error handlers for login and signup */}
                {errors ?
                <p>{errors}</p> :
                <p></p>}
                {/* fetch error handlers for login and signup */}

                <label htmlFor="username">Username:</label>
                <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}>
                </input>

                <label htmlFor="password">Password:</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}>
                </input>
                    <button type='submit'>login</button>
                </form>
            </header>
        </div>
    );
}

export default Login;