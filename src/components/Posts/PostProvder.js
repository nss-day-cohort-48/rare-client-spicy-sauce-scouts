import React, { useState,createContext } from "react"

export const PostContext = createContext()

export const ProfileProvider = (props) => {
    const [Posts, setPosts] = useState([])
    const [Posts, setPostsBySubscripton] = useState([])

    const getPosts = () => {
        return fetch("http://localhost:8088/posts")
            .then(res => res.json())
            .then(setPosts)
    }

    const getPostsBySubscripton = (id) => {
        return fetch(`http://localhost:8088/posts?subscriber_id=${id}`)
            .then(res => res.json())
            .then(setPostsBySubscripton)
    }

    return (
        <PostContext.Provider value={{
            Posts, getPosts , setPostsBySubscripton
        }}>
            {props.children}
        </PostContext.Provider>
    )
}
