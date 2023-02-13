import { useState } from "react";


function UpdateProfile({user}) {

    const [avatar, setAvatar] = useState(user.avatar)
    const [bio, setBio] = useState(user.bio)
    const [errors, setErrors] = useState(null)

    const refreshPage = ()=>{
        window.location.reload();
     }

    function handleSave(e) {
        e.preventDefault();
        fetch(`/users/${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            avatar,
            bio,
          }),
        })
        .then((r) => {
          if(r.ok) {
            setErrors([])
            r.json().then((user) => {
              console.log(`User pic: ${user.avatar}`)
              console.log(`User bio: ${user.bio}`)
              refreshPage()
            })
          }
          else {
            r.json().then((err)=> setErrors(err.errors))
          }
        });
      }

    return(
        <form className="create-update-form"
          onSubmit={handleSave}
          style={{display: "flex", flexDirection: "column", margin: "50px 50px"}}>

          {errors ?
          <p className="error-box">{errors}</p> :
          <p></p>}

          <label htmlFor="avatar">{user.username} Profile picture:</label>
          <input
          type="text"
          id="avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}>
          </input>

          <label htmlFor="bio">Profile Bio:</label>
          <input
          type="text"
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}>
          </input>
              <button className="click-button" type='submit'>save</button>
          </form>

    );
}

export default UpdateProfile