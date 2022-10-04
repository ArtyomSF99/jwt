import FriendList from "../FriendList"
import Home from "../Home"
import Login from "../Login"
import Registration from "../Registration"
import RequestList from "../RequestList"
import Users from "../Users"


export const privateRoutes = [
    {path: '/', component: <Home/>, exact: true},
    {path: '/home', component: <Home/>, exact: true},
    {path: '/users', component: <Users/>, exact: true},
    {path: '/friendlist', component: <FriendList/>, exact: true},
    {path: '/requestlist', component: <RequestList/>, exact: true},
    {path: '*',  component: <Home/>, exact: true},
]

export const publicRoutes = [
    {path:'/login', component: <Login/>, exact: true},
    {path: '/registration', component: <Registration/>, exact: true},
   
    
]