import logo from './logo.svg';
import { useEffect, useState } from "react";

function FollowersFollowings({userId, keyWord}) {

    const[follows, setFollows] = useState([])
    console.log(keyWord)

    useEffect(()=>{
        fetch(`/users/${userId}/followings`).then((r) => {
          if (r.ok) r.json().then((res) => {
            console.log(res)
            setFollows(res)});
        })},[keyWord])

    if(follows) {
        return(
            <div className='followship'>
                {follows 
                ? follows.map(({id, username, avatar})=><div className='follow' key={id}><p>@{username}</p><img src={avatar ? avatar : logo} alt=""></img></div>) 
                : <p>You have no {keyWord} </p>}
            </div>
        );
    }
}

export default FollowersFollowings