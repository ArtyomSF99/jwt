import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FriendList = () => {
    const loginUser = JSON.parse(localStorage.getItem('user'));
    const[friends, setFriends] = useState([])
    let[count, setCount] = useState(0)
    
    async function getFriends() {
        const response = await axios.get(`http://localhost:5000/friends/${loginUser.id}`  );
        await setFriends(response.data)
    }
    async function removeFriend(id) {
         const response = await axios.delete(`http://localhost:5000/friend/${loginUser.id}/${id.target.id}`);
        console.log(id.target.id)
    }
    useEffect(() => {
        getFriends()
    },[])
    return(
        <div>
            
            <div>
           
            {friends.length===0
            ?<div className="myinput">У вас нету друзей</div>
            :friends.map( friend => 
              <div key={friend.id}>
              <div className="mydiv">
                <div>{friend.firstname}adsfasdf</div>
                <div>{friend.lastname}</div>
                
                <button className="mydiv"  id={friend.second_user} onClick={removeFriend}>Удалить из друзей</button>
                </div>
              </div>
              
                
            )}
            </div>
            <Link to={`/RequestList`} >
            <button className='myinput'>Запросы добавления в друзья</button>
           </Link>
           <Link to={`/Home`} >
            <button className='myinput'>Домой</button>
           </Link>
        </div>
    )
}

export default FriendList