import logo from './logo.svg';
import { useState } from 'react';

function Signup({onSignup}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([])
    
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
          .then((r) => {
            if(r.ok) {
              r.json().then((user) => {
                onSignup(false)
                console.log(`User: ${user.username} has been created`)})

            }
            else {
              r.json().then((err)=> setErrors(err.errors))
            }
          });
      }

    return(
        <div className = "login-signup-box">
            <header className='login-signup-header'> 
                <section><img src={logo} alt=""></img>Instaclone</section>
                <form onSubmit={handleSubmit}>

                {/* fetch error handlers for login and signup */}
                {errors.length > 0 ?
                errors.map((error, index)=><p key={index}>{error}</p>) :
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
                
                <label htmlFor="password_confirmation">Confirm Password:</label>
                <input
                type="password"
                id="password_confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}>
                </input>
                    <button type='submit'>Signup</button>
                </form>
                <div><button onClick={()=>onSignup(false)}>I have an account!</button></div>
            </header>
        </div>
    );
}

export default Signup;