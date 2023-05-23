import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

import Navigation from '../components/Navigation'
import axiosClient from '../axios-client'

function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext()

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
            <Navigation user={user} />
            <Outlet />
        </>
    )
}

export default DefaultLayout