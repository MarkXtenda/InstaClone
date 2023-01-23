import logo from './logo.svg';

function Feed() {
    const posts = []
    for (let i = 0; i < 6; i++) {
        posts.push(i)

    }
    return(
        <div className = "feed">
            <header> 
                <img src={logo} style={{height: "50px", width: "50px"}} alt=""></img>
                <input></input>
                <button>logout</button>
            </header>
            <div>{posts.map((element)=><img key={element} src={logo} alt=""></img>)}</div>
        </div>
    );
}

export default Feed;