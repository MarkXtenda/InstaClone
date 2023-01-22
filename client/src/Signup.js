import logo from './logo.svg';
import { useState } from 'react';

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            password_confirmation: passwordConfirmation,
          }),
        })
          .then((r) => r.json())
          .then((user)=>console.log(`User: ${user.username} has been created`));
      }

    return(
        <div className = "Signup">
            <header style={{display: "flex", flexDirection: "column", padding: "100px 500px"}}> 
                <section><img src={logo} style={{height: "50px", width: "50px"}} alt=""></img>Instaclone</section>
                <form 
                onSubmit={handleSubmit}
                style={{display: "flex", flexDirection: "column", margin: "50px 50px"}}>
                
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
                
                <label htmlFor="password_confirmation">Confirm Password:</label>
                <input
                type="password"
                id="password_confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}>
                </input>
                    <button type='submit'>login</button>
                </form>
            </header>
        </div>
    );
}

export default Signup;