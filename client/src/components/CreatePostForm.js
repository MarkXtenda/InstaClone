import { useState } from "react";


function CreatePostForm({user}) {

    const [image, setImage] = useState("")
    const [caption, setCaption] = useState("")
    const [errors, setErrors] = useState([])

    const refreshPage = ()=>{
        window.location.reload();
     }

    function handleSave(e) {
        e.preventDefault();
        fetch(`/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image,
            caption,
          }),
        })
        .then((r) => {
          if(r.ok) {
            setErrors([])
            r.json().then((user) => {
              // console.log(`Post image: ${user.posts.last.image}`)
              // console.log(`Post caption: ${user.posts.last.caption}`)
              refreshPage()
            })
          }
          else {
            r.json().then((err)=> setErrors(err.errors))
          }
        });
      }

    return(
        <form
                onSubmit={handleSave}
                style={{display: "flex", flexDirection: "column", margin: "50px 50px"}}>

                {errors ?
                <p>{errors}</p> :
                <p></p>}
                <h4>New Post</h4>
                <label htmlFor="image">Post image:</label>
                <input
                type="text"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}>
                </input>

                <label htmlFor="caption">Post caption:</label>
                <input
                type="text"
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}>
                </input>
                    <button type='submit'>save</button>
                </form>

    );
}

export default CreatePostForm