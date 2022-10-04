import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
    const loginUser = JSON.parse(localStorage.getItem('user'));
    const[users, setUsers] = useState([])
    let[count, setCount] = useState(0)
    
    async function getUsers() {
        const response = await axios.get(`http://localhost:5000/users`  );
        await setUsers(response.data)
    }
    async function addFriend(id) {
         const response = await axios.post(`http://localhost:5000/request/${loginUser.id}/${id.target.id}`);
        
    }
    useEffect(() => {
        getUsers()
    },[])
    return(
        <div>
            <button onClick={getUsers}>getUsers</button>
            <div>
            {users.map( user => 
              <div key={user.id}>
              {user.firstname
              ?<div className="mydiv">
                <div>{user.id}</div>
                <div>{user.firstname}</div>
                <div>{user.lastname}</div>
                <button className="mydiv" id={user.id} onClick={addFriend}>Добавить</button>
                </div>
              :null}
                
                
              </div>
               
                
            )}
            </div>
            <Link to={`/FriendList`} >
            <button className='myinput'>Список ваших друзей</button>
           </Link>
           <Link to={`/RequestList`} >
            <button className='myinput'>Запросы в друзья</button>
           </Link>
        </div>
    )
}

export default Users;