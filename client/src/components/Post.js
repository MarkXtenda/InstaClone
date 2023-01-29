import logo from './logo.svg';

function Post() {
  return (
    <div className="Post">
        <section><img src={logo} alt=''></img></section>
        <section>
            likes<button>like</button>
        </section>
    </div>
  );
}

export default Post;