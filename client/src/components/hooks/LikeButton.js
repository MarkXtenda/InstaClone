const LikeButton = ({ userId, postId, isLiked, likeAmount, setLiked}) => {

  function handleLike() {
      fetch('/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            user_id: userId, 
            post_id: postId 
        })
      })
      .then((r) => {
          if(r.ok) {
              r.json().then((res) => {
                console.log("liked: "+parseInt(res.post_likes))
                setLiked(res.is_liked)
              })
          }
          else {
              r.json().then((err)=> console.log(err.errors))
          }}
      );  
  }

  return (
    <div className="like-div">
      <p>{likeAmount} Likes </p><button className="click-button" onClick={handleLike}>{ isLiked ? "Unlike" : "Like"}</button>
    </div>
  );
};


export default LikeButton;


