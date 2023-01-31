import { Link } from "react-router-dom";

function SearchUser({users, clearSearch}) {
    return(
        <div>
            <h1>SEARCHING</h1>
            {users.map(({id,username,avatar})=><Link to={"/users/"+id} onClick={()=>clearSearch([])}key={id}><img src={avatar} style={{height: "50px", width: "50px"}}></img><p>{username}</p></Link>)}
        </div>
    );
}

export default SearchUser