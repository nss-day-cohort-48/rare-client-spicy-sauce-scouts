import React, { useState,createContext } from "react"

export const ProfileContext = createContext()

export const ProfileProvider = (props) => {
    const [Users, setUsers] = useState([])
    const [CurrentUser ,setCurrentUser] = useState([])

    const getUsers = () => {
        return fetch("http://localhost:8088/users")
            .then(res => res.json())
            .then(setUsers)
    }

    const getUserById = (id) => {
        return fetch(`http://localhost:8088/users/${id}`)
            .then(res => res.json())
            .then(setCurrentUser)
    }

    return (
        <ProfileContext.Provider value={{
            Users, CurrentUser, getUsers, getUserById
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}
