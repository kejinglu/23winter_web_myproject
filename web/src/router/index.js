import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login";
import NotFound from "../pages/404";
import Home from "../pages/front/Home";
import Details from "../pages/front/Details";
import CreatePost from "../pages/front/CreatePost";
import CreateChannel from "../pages/front/CreateChannel";
import Register from "../pages/Regiter";
import User from "../pages/backend/User";
import Comment from "../pages/backend/Comment";
import Channel from "../pages/backend/Channel";
import Post from "../pages/backend/Post";
import RequireAuthRoute from "./Auth";
import Search from "../pages/front/Search";

const router = createBrowserRouter([
    {
        path: '/',
    },
    {
        index: true,
        element: <RequireAuthRoute><Home/></RequireAuthRoute>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/details/:id',
        element: <RequireAuthRoute><Details/></RequireAuthRoute>
    },
    {
        path: '/createPost',
        element: <RequireAuthRoute><CreatePost/></RequireAuthRoute>
    },
    {
        path: '/createChannel',
        element: <RequireAuthRoute><CreateChannel/></RequireAuthRoute>
    },
    {
        path: '/search',
        element: <RequireAuthRoute><Search/></RequireAuthRoute>
    },
    {
        path: '/user',
        element: <RequireAuthRoute><User/></RequireAuthRoute>
    },
    {
        path: '/comment',
        element: <RequireAuthRoute><Comment/></RequireAuthRoute>
    },
    {
        path: '/channel',
        element: <RequireAuthRoute><Channel/></RequireAuthRoute>
    },
    {
        path: '/post',
        element: <RequireAuthRoute><Post/></RequireAuthRoute>
    },
    {
        path: '*',
        element: <NotFound/>,
    },
])

export default router;