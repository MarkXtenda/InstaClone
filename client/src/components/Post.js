import { useState, useEffect } from 'react';
import { useLocation } from 'react-router'

function Post() {

  const [post, setPost] = useState([]);
  const location = useLocation()
  const path = location.pathname.split('/')[2]
  // need some work on fetch api
  useEffect(()=>{
    fetch(`/posts/${path}`).then((r) => {
      if (r.ok) r.json().then((res) => setPost(res));
    })},[])

  if(post) {
    return (
      <div className = "feed">
        <h1></h1>
      <div  className='feed-content'>
        <div className='user-feed-box'>

        </div>
          <img className='post-feed-image' key={post.id} src={post.image} alt=""></img>
          <div className='post-feed-caption'>
            <p>{post.caption}</p>
            <p>{post.likes ? post.likes : 0} likes<button>like</button></p>
          </div>
      </div>
      </div>
    );
  }
}

export default Post;