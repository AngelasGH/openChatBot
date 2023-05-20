import { createBrowserRouter } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import GuestLayout from "./layouts/GuestLayout"
import User from './pages/User'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'


const router = createBrowserRouter([

    {
        path: "/",
        element: <DefaultLayout />,
        children:
            [
                {
                    path: "home",
                    element: <User />,
                },
            ],
    },
    {
        path: "/guest/",
        element: <GuestLayout />,
        children:
            [
                {
                    path: "login",
                    element: <Login />
                },
                {
                    path: "signup",
                    element: <Signup />
                }
            ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])

export default router;