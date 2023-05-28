import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

import Navigation from '../components/Navigation'
import axiosClient from '../axios-client'
import Home from '../pages/Home'

function DefaultLayout() {
    const { token, setUser, setToken } = useStateContext()

    if (!token) {
        return <Navigate to="/guest/login" />
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)
            })
    }, [])

    return (
        <>
            <Navigation />
            <Outlet />
        </>
    );

}

export default DefaultLayout