import logo from './logo.svg';

function Login() {

    return(
        <div className = "Login">
            <header style={{display: "flex", flexDirection: "column"}}> 
                <section><img src={logo} style={{height: "50px", width: "50px"}} alt=""></img>Instaclone</section>
                <section style={{display: "flex", flexDirection: "column"}}>
                    <input></input>
                    <input></input>
                    <button>login</button>
                </section>
            </header>
        </div>
    );
}

export default Login;