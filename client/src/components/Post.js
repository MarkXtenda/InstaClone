import logo from './logo.svg';
import { useParams, useState, useEffect } from 'react';
import { useLocation } from 'react-router'
function Post() {

  const [post, setPost] = useState([]);
  // const id = useParams().id;
  const location = useLocation()
  const path = location.pathname.split('/')[2]
  // need some work on fetch api
  useEffect(()=>{
    fetch(`/posts/${path}`).then((r) => {
      if (r.ok) r.json().then((res) => setPost(res));
    })},[])

  if(post) {
    return (
      <div  className="Post">
          <img key={post.id} src={post.image} alt=""></img>
          <section className='caption'>{post.caption}</section>
          <section>{post.likes ? post.likes : 0} likes<button>like</button></section>
      </div>
    );
  }
}

export default Post;