import './HomePage.css';
import logo from './logo.svg';
import { useState } from 'react';
import CreatePostForm from './CreatePostForm';
import UpdateProfile from './UpdateProfile';
import { Link } from 'react-router-dom';

function HomePage({user}) {
    const [togle, setToggle] = useState("Home")
    // const [chosenPost, setChosenPost] = useState(0)

    return(
        <div className = "user-page">
            <section className="user-section">
            <div>
                <img src={user.avatar ? user.avatar : logo} alt=""></img>
            </div>    
            <div>
                <ul>
                    <li>{user.username}</li>
                    <h4>
                        {user.posts ? user.posts.length : 0} posts, 
                        <Link to={user.id+"/followers"}>{user.followers ? user.followers.length : 0} followers</Link>, 
                        <Link to={user.id+"/followings"}>{user.followings ? user.followings.length : 0} following</Link>
                    </h4>
                    <li>{user.bio}</li>
                </ul>
            </div>
            </section>
            <section className='user-options'>
                <button className={togle === "Home" ? 'active-button' : 'option-button'} onClick={()=>setToggle("Home")}><p className='icons'>📷</p></button>
                <button className={togle === "UpdateProfile" ? 'active-button' : 'option-button'} onClick={()=>setToggle("UpdateProfile")}><p className='icons'>✍️</p></button>
                <button className={togle === "CreatePost" ? 'active-button' : 'option-button'} onClick={()=>setToggle("CreatePost")}><p className='icons'>➕</p></button>
            </section>
            <section className="post-update-create-section">
                {
                ({ 
                    Home: <div>{ user.posts && user.posts.map(({id,image})=> <Link className='post' to={"/posts/"+id} key={id} id={id}><img className='post' src={image} alt=''></img></Link>)}</div>,
                    UpdateProfile: <UpdateProfile user={user}></UpdateProfile>,
                    CreatePost: <CreatePostForm user={user}></CreatePostForm>
                })[togle]
                }             
            </section>
        </div>
    );
}

export default HomePage;