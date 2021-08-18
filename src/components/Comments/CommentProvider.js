import React, { useState,createContext } from "react"

export const CommentContext = createContext()

export const CommentProvider = (props) => {
    const [Comments, setComments] = useState([])

    const userId = localStorage.getItem("rare_user_id")

    const addComment = Comment => {
        return fetch("http://localhost:8088/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Comment)
        })
        .then(response => response.json())
    }

    const getComments = () => {
        return fetch("http://localhost:8088/comments")
            .then(res => res.json())
            .then(setComments)
    }

    const deleteComment = CommentId => {
        return fetch(`http://localhost:8088/Comments/${CommentId}`, {
            methodL: "DELETE"
        })
        .then(getComments)
    }

    const updateComment = CommentObj => {
        return fetch(`http://localhost:8088/Comments/${CommentObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(CommentObj)
        })
        .then(getComments)
    }



    return (
        <CommentContext.Provider value={{
            Comments, getComments,
            setComments,
            deleteComment,
            updateComment,
            addComment
        }}>
            {props.children}
        </CommentContext.Provider>
    )
}