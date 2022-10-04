import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./context";

const Home = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    async function logout() {
        const response = await axios.post(`http://localhost:5000/api/logout`  );
       localStorage.clear()
    }
    return(
        <div className="login">
        <Link to={`/Users`} >
            <button className='myinput'>Пользователи</button>
           </Link>
            <Link to={`/FriendList`} >
            <button className='myinput'>Список ваших друзей</button>
           </Link>
           <Link to={`/RequestList`} >
            <button className='myinput'>Запросы в друзья</button>
           </Link>
           <Link to={`/Login`} >
            <button className='myinput' onClick={logout}>выйти</button>
           </Link>
           
        </div>
    )
}

export default Home;