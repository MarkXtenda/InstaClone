import logo from './logo.svg';
import './HomePage.css';

function Feed({user}) {

    const posts = []
    for (let i = 0; i < 6; i++) {
        posts.push(i)

    }
    return(
        <div className = "feed">
            <div>{posts.map((element)=><img key={element} src={logo} alt=""></img>)}</div>
        </div>
    );
}

export default Feed;