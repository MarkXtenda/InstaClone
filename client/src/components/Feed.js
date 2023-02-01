import logo from './logo.svg';
import './HomePage.css';
import { useEffect, useState } from 'react';

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
        return(
            <div className = "feed">
                <h1>feed</h1>
                {feed.map((post)=>
                <div key={post.id}>
                    <div>
                        <img src={post.user.avatar ? post.user.avatar : logo} style={{height: "50px", width: "50px"}}></img>
                        <p>@{post.user.username}</p>
                    </div>
                    <img key={post.id} src={post.image ? post.image : logo} alt="" style={{height: "500px", width: "500px"}}></img>
                    <p>likes {post.likes}</p>
                    <p>{post.caption}</p>
                </div>
                )}
            </div>
        );
    }
}

export default Feed;