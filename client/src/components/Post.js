import { useState, useEffect } from 'react';
import { useLocation } from 'react-router'
import LikeButton from './hooks/LikeButton';

function Post({userId}) {

  const [post, setPost] = useState([]);
  const location = useLocation()
  const path = location.pathname.split('/')[2]
  const [isLiked, setIsLiked] = useState(null)
  const [likeAmount, setLikeAmount] = useState(null)
  const [liked, setLiked] = useState(null)
  // need some work on fetch api

  useEffect(()=>{
    Promise.all([
      // Get User
      fetch(`/posts/${path}`).then(res => res.json()),
      // Get User Followers
      fetch(`/like?user_id=${userId}&post_id=${path}`, {method: "GET",}).then(res => res.json())])
      .then(([postData, likeData]) => {
        setPost(postData)
        setIsLiked(likeData.is_like_exist)
        setLikeAmount(likeData.like_amount)
      })},[liked])
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
            <LikeButton userId = {userId} postId = {post.id} isLiked = {isLiked} likeAmount = {likeAmount} setLiked={setLiked}/>
          </div>
      </div>
      </div>
    );
  }
}

export default Post;