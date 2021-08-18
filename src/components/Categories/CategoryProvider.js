import React, { useState,createContext } from "react"

export const CategoryContext = createContext()

export const CategoryProvider = (props) => {
    const [Categories, setCategories] = useState([])
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

    const getCategories = () => {
        return fetch("http://localhost:8000/categories")
            .then(res => res.json())
            .then(setCategories)
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
        <CategoryContext.Provider value={{
            Categories, getCategories,
            setCategories,
            // getPostsBySubscripton,
            // setPostsBySubscripton,
            // deletePost,
            // updatePost
        }}>
            {props.children}
        </CategoryContext.Provider>
    )
}