import { useState } from 'react';

const LikeButton = ({ userID, postId }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    // like fetch
    fetch(`/likes?user_id=${followed_user_id}&post_id=${follower_id}`, {method: "GET",}).then((r) => {
      if (r.ok) {
        r.json().then((likedData) => {
            setLiked(likedData)
        });
      }
    });
  }, []);


  function handleLike() {
    if(!liked) {
        fetch('/likes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                user_id: userId, 
                post_id: postId 
            })
        })
        .then((r) => {
            if(r.ok) {
                r.json().then((liked) => {
                    setLikes(liked)
                })
            }
            else {
                r.json().then((err)=> setErrors(err.errors))
            }}
        );
    }
    else {
        fetch(`/likes/${postId}`, {
            method: 'DELETE'
        })
        .then((r) => {
            if(r.ok) {
              r.json().then((unliked) => {
                setLikes(unliked)
              })
            }
            else {
              r.json().then((err)=> setErrors(err.errors))
            }}
        );
    }
  }

  return (
    <div>
      <p>{likes} Likes </p><button onClick={handleLike}>{liked ? "Unlike" : "Like"}</button>
    </div>
  );
};

export default LikeButton;


