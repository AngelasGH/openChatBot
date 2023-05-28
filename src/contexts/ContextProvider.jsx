/// serves as the state management provider for all the data needed in your application

import { createContext, useContext, useState } from "react";

// creates context and defines initial state values and functions to update those sate
const StateContext = createContext({
    user: null,
    token: null,
    messages: null,
    conversation: null,
    setUser: () => { },
    setToken: () => { },
    setMessages: () => { },
    setConversation: () => { },
})

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))

    const [messages, setMessages] = useState([])

    const setToken = (token) => {
        _setToken(token)

        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token)
        }
        else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    return (
        <>
            {/** ContextProvider wraps its children with the StateContext.Provider component, providing the state values and setter functions as the value prop */}
            <StateContext.Provider value={{
                user,
                token,
                messages,
                setUser,
                setToken,
                setMessages,
            }}>
                {children}
            </StateContext.Provider>
        </>
    );
}


export const useStateContext = () => useContext(StateContext)
