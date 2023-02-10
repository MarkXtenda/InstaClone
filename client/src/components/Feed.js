import logo from './logo.svg';
import './HomePage.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Feed({user}) {
    const [feed, setFeed] = useState([])

    useEffect(() => {
        // feed fetch
        fetch(`/follow/${user.id}`).then((r) => {
          if (r.ok) {
            r.json().then((data) => {
                setFeed(data)});
          }
        });
      }, []);
    if(feed) {
        console.log(feed)
        return(
            <div className = "feed">
                <h1>Your Feed:</h1>
                {feed.map((post)=>
                <div className='feed-content' key={post.id}>
                    <Link to={"/users/"+post.user.id}><div className='user-feed-box'>
                        <img className='user-feed-avatar' src={post.user.avatar ? post.user.avatar : logo} style={{height: "50px", width: "50px"}}></img>
                        <p className='user-feed-username' >@{post.user.username}</p>
                    </div></Link>
                    <img className='post-feed-image' key={post.id} src={post.image ? post.image : logo} alt="" style={{height: "500px", width: "500px"}}></img>
                    <div className='post-feed-caption'>
                        <p>{post.caption}</p>
                        <p>{post.likes} likes <button>like</button></p>
                    </div>
                </div>
                )}
            </div>
        );
    }
}

export default Feed;