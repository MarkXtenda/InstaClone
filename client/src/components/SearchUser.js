import { Link } from "react-router-dom";
import logo from './logo.svg'

function SearchUser({users, clearSearch}) {
    return(
        <div>
            <p>Search Results:</p>
            {users.map(({id,username,avatar})=><Link to={"/users/"+id} onClick={()=>clearSearch([])} key={id}><img src={avatar ? avatar : logo} style={{height: "50px", width: "50px"}}></img><p>{username}</p></Link>)}
        <button onClick={()=>clearSearch([])}>X</button>
        </div>
    );
}

export default SearchUser