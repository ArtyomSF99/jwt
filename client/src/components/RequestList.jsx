import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RequestList = () => {
   
    const loginUser = JSON.parse(localStorage.getItem('user'));
    const[request, setRequest] = useState([])
    let[count, setCount] = useState(0)
    
    async function getRequest() {
        const response = await axios.get(`http://localhost:5000/request/${loginUser.id}`  );
        await setRequest(response.data)
    }
    async function acceptFriend(request) {
         const response = await axios.put(`http://localhost:5000/request/${loginUser.id}/${request.target.id}`);
        
    }
    async function rejectFriend(request) {
      const response = await axios.delete(`http://localhost:5000/request/${loginUser.id}/${request.target.id}`);
        
       
   }
    useEffect(() => {
        getRequest()
    },[])
    return(
        <div>
            <button onClick={getRequest}>getUsers</button>
            
            <div>
            {console.log(request)}
            {request.length===0
            ?<div className="myinput">У вас нету запросов</div>
            :request.map( request => 
              <div key={request.id}>
              <div className="mydiv">
                <div>{request.firstname}adsfasdf</div>
                <div>{request.lastname}</div>
                <button className="mydiv" id={request.second_user}  onClick={acceptFriend}>Принимать</button>
                <button className="mydiv"  id={request.second_user} onClick={rejectFriend}>Отклонить</button>
                </div>
              </div>
              
                
            )}
            </div>
            <Link to={`/FriendList`} >
            <button className='myinput'>Список ваших друзей</button>
           </Link>
           <Link to={`/Home`} >
            <button className='myinput'>Домой</button>
           </Link>
        </div>
    )
}

export default RequestList;