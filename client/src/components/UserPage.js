import logo from './logo.svg'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

function UserPage({logedInUser, userId, searched}) {

  const [user, setUser] = useState([]);
  const location = useLocation()
  const path = location.pathname.split('/')[2]

  const [follow, setFollow] = useState(false)
  const follower_id = userId
  const followed_user_id  = parseInt(path)
  const [followed, setFollowed] = useState(null)
  
  useEffect(()=>{
    Promise.all([
      fetch(`/users/${path}`).then(res => res.json()),
      fetch(`/follow?followed_user_id=${followed_user_id}&follower_id=${follower_id}`, {method: "GET",}).then(res => res.json())])
      .then(([userData, followData]) => {
        setUser(userData)
        setFollowed(followData)
      })

    // fetch(`/users/${path}`).then((r) => {
    //   if (r.ok) r.json().then((res) => {
    //     // console.log(res)
    //     setUser(res)
    //     // setFollowed(res.followers.map(({id})=>id).includes(userId))
    //   });
    // })

    // fetch(`/follow?followed_user_id=${followed_user_id}&follower_id=${follower_id}`, {
    //   method: "GET",
    // })
    // .then((r) => {
    //   if (r.ok) {
    //     r.json().then((is_followExist) => {
    //       setFollowed(is_followExist)
    //       console.log(is_followExist)
    //     });
    //   }
    // });
  
  },[searched, followed])

      function handleFollow() {
        if (!followed) {
          fetch(`/follow`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              follower_id,
              followed_user_id,
            }),
          })
          .then(res => res.json()).then((res) => {
            setFollowed(true)
            setFollow(true)
            console.log(res)
          }).catch((err)=>{
            setFollowed(true)
            setFollow(true)
            console.log(err)
          })
        } 
        else {
          fetch(`/follow/${followed_user_id}?follower_id=${follower_id}`, { method: "DELETE"})
          .then((r) => {
            if (r.ok) {
              setFollowed(false)
              setFollow(false)
            }
          });
        }
      }

  if(user) {
    return (
      <div  className="home-page">
          <section className="user-section">
            <div>
                <img src={user.avatar ? user.avatar : logo} style={{height: "100px", width: "100px"}} alt=""></img>
            </div>    
                <div>
                    <ul>
                      <li><button onClick={handleFollow}>{!followed ? 'follow' : 'unfollow'}</button></li>
                      <h4>{user.posts ? user.posts.length : 0} posts, {user.followers ? user.followers.length : 0} followers, {user.followings ? user.followings.length : 0} following</h4>
                      <li>{user.bio}</li>
                    </ul>
                </div>
            </section>
            <section className="post-section">
                    <div>
                      {user.posts && user.posts.map(({id,image})=> 
                      <Link to={"/posts/"+id} key={id} id={id}><img src={image} alt='' style={{height: "200px", width: "200px"}}></img></Link>)}
                    </div>       
            </section>
      </div>
    );
  }
}

export default UserPage;