import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import { AuthContext } from "./context"
import Login from "./Login"
import Registration from "./Registration"
import { privateRoutes, publicRoutes } from "./router/router"



const AppRouter = () => {
    
    const {isAuth} = useContext(AuthContext)
    return(
        isAuth
        ?<Routes>
            {privateRoutes.map(route =>
            <Route element={route.component} path={route.path} exact={route.exact} key={route.path}/>
            )} 
        </Routes>
        :<Routes>
            {publicRoutes.map(route =>
            <Route element={route.component} path={route.path} exact={route.exact} key={route.path}/>
            )} 
            <Route path="*" element={<Registration/>}/>
        </Routes>
        
       
    )
}

export default AppRouter