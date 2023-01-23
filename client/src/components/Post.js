import logo from './logo.svg';

function Post() {
  return (
    <div className="Post">
        <header> 
            <img src={logo} style={{height: "50px", width: "50px"}} alt=""></img>
            <input></input>
            <button>login</button>
            <button>signup</button>
        </header>
        <section><img src={logo} alt=''></img></section>
        <section>
            likes<button>like</button>
        </section>
    </div>
  );
}

export default Post;