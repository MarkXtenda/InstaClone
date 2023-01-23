import './HomePage.css';
import logo from './logo.svg';

function HomePage() {
    const posts = []
    for (let i = 0; i < 6; i++) {
        posts.push(i)

    }
    return(
        <div className = "home-page">
            <header> 
                <img src={logo} style={{height: "50px", width: "50px"}} alt=""></img>
                <input></input>
                <button>login</button>
                <button>signup</button>
            </header>
            <section className="user-section">
            <div>
                image
                <img src={logo} style={{height: "100px", width: "100px"}} alt=""></img>
            </div>    
                <div>
                    <ul>
                        <li>username</li>
                        <li>posts, followers, following</li>
                        <li>bio</li>
                    </ul>
                </div>
            </section>
            <section className="post-section">
                {posts.map((post) => <img key={post} src={logo} style={{height: "200px", width: "200px"}} alt=""></img>)}
            </section>
        </div>
    );
}

export default HomePage;