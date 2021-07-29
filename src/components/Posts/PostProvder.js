import React, { useState,createContext } from "react"

export const PostContext = createContext()

export const ProfileProvider = (props) => {
    const [Posts, setPosts] = useState([])
    const [Posts, setPostsBySubscripton] = useState([])

    const userId = localStorage.getItem("rare_user_id")

    const addPost = post => {
        return fetch("http://localhost:8088/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
        .then(response => response.json())
    }

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

    const deletePost = postId => {
        return fetch(`http://localhost:8088/posts/${postId}`, {
            methodL: "DELETE"
        })
        .then(getPosts)
    }

    const updatePost = postObj => {
        return fetch(`http://localhost:8088/posts/${postObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postObj)
        })
        .then(getPosts)
    }



    return (
        <PostContext.Provider value={{
            Posts, getPosts,
            setPosts,
            getPostsBySubscripton,
            setPostsBySubscripton,
            deletePost,
            updatePost
        }}>
            {props.children}
        </PostContext.Provider>
    )
}
