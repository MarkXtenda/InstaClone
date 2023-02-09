import logo from './logo.svg';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function FollowersFollowings({userId, keyword}) {

    const[follows, setFollows] = useState([])

    useEffect(()=>{
        fetch(`/users/${userId}/${keyword}`).then((r) => {
          if (r.ok) r.json().then((res) => {
            setFollows(res)});
        })},[keyword])

    if(follows) {
        return(
            <div className='followship'>
                {follows.length > 0
                ? follows.map(({id, username, avatar})=><Link to={"/users/"+id} key={id}><div className='follow'><p>@{username}</p><img src={avatar ? avatar : logo} alt=""></img></div></Link>) 
                : <h1>You have no {keyword} </h1>}
            </div>
        );
    }
}

export default FollowersFollowings