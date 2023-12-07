import { Navigate } from "react-router"
export default function RequireAuthRoute({children}) {
    // Obtain from locationStorage
    const user = localStorage.getItem('user')


    // Get location
    if(!user){
        return <Navigate to="/login"></Navigate>
    }

    return children

}

