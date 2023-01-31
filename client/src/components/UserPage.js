import logo from './logo.svg'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom';

function UserPage({searched}) {

  const [user, setUser] = useState([]);
  const location = useLocation()
  const path = location.pathname.split('/')[2]

  useEffect(()=>{
      fetch(`/users/${path}`).then((r) => {
        if (r.ok) r.json().then((res) => {
          console.log(res)
          setUser(res)});
      })},[searched])

  if(user) {
    return (
      <div  className="home-page">
          <section className="user-section">
            <div>
                <img src={user.avatar ? user.avatar : logo} style={{height: "100px", width: "100px"}} alt=""></img>
            </div>    
                <div>
                    <ul>
                        <li>{user.username}</li>
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