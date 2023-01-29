import './HomePage.css';
import logo from './logo.svg';
import { useState } from 'react';
import CreatePostForm from './CreatePostForm';
import UpdateProfile from './UpdateProfile';

function HomePage({user}) {
    const [togle, setToggle] = useState("Home")
    const [createPost, setCreatePost] = useState("CreatePost")
    const [updateProfile, setUpdateProfile] = useState("UpdateProfile")

    const posts = []
    for (let i = 0; i < 6; i++) {
        posts.push(i)

    }

    return(
        <div className = "home-page">
            <section className="user-section">
            <div>
                <img src={user.avatar ? user.avatar : logo} style={{height: "100px", width: "100px"}} alt=""></img>
            </div>    
                <div>
                    <ul>
                        <li>{user.username}</li>
                        <h4>{user.posts.length} posts, followers, following</h4>
                        <li>{user.bio}</li>
                    </ul>
                </div>
            </section>
            <section>
                <button onClick={()=>setToggle("Home")}><img src="https://www.freeiconspng.com/thumbs/camera-icon/camera-icon-21.png" style={{height: "100px", width: "100px"}} alt=""></img></button>
                <button onClick={()=>setToggle("UpdateProfile")}><img src="https://cdn-icons-png.flaticon.com/512/266/266146.png" style={{height: "100px", width: "100px"}} alt=""></img></button>
                <button onClick={()=>setToggle("CreatePost")}><img src="https://cdn-icons-png.flaticon.com/512/32/32339.png" style={{height: "100px", width: "100px"}} alt=""></img></button>
            </section>
            <section className="post-section">
                {
                ({
                    
                    Home: <div>{ user.posts.length > 0 && user.posts.map((post)=> <img key={post.id} src={post.image} style={{height: "200px", width: "200px"}} alt=""></img>)}</div>,
                    UpdateProfile: <UpdateProfile user={user}></UpdateProfile>,
                    CreatePost: <CreatePostForm user={user}></CreatePostForm>
                })[togle]
                }             
            </section>
        </div>
    );
}

export default HomePage;