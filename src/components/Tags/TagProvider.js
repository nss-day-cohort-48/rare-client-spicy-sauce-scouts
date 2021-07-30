import React, { useState,createContext } from "react"

export const TagContext = createContext()

export const TagProvider = (props) => {
    const [Tags, setTags] = useState([])
    // const [Post, setPostsBySubscripton] = useState([])

    // const userId = localStorage.getItem("rare_user_id")

    // const addPost = post => {
    //     return fetch("http://localhost:8088/posts", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(post)
    //     })
    //     .then(response => response.json())
    // }

    const getTags = () => {
        return fetch("http://localhost:8088/tags")
            .then(res => res.json())
            .then(setTags)
    }

    // const getPostsBySubscripton = (id) => {
    //     return fetch(`http://localhost:8088/posts?subscriber_id=${id}`)
    //         .then(res => res.json())
    //         .then(setPostsBySubscripton)
    // }

    // const deletePost = postId => {
    //     return fetch(`http://localhost:8088/posts/${postId}`, {
    //         methodL: "DELETE"
    //     })
    //     .then(getPosts)
    // }

    // const updatePost = postObj => {
    //     return fetch(`http://localhost:8088/posts/${postObj.id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(postObj)
    //     })
    //     .then(getPosts)
    // }



    return (
        <TagContext.Provider value={{
            Tags, getTags,
            setTags,
            // getPostsBySubscripton,
            // setPostsBySubscripton,
            // deletePost,
            // updatePost
        }}>
            {props.children}
        </TagContext.Provider>
    )
}