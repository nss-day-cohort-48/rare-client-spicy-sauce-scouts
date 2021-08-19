import React, { useState,createContext } from "react"

export const CommentContext = createContext()

export const CommentProvider = (props) => {
    const [Comments, setComments] = useState([])

    const addComment = Comment => {
        return fetch("http://localhost:8000/comments", {
            method: "POST",
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Comment)
        })
        .then(response => response.json())
    }

    const getComments = () => {
        return fetch("http://localhost:8000/comments",			
        {
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
            },
        }	)
            .then(res => res.json())
            .then(setComments)
    }

    const deleteComment = CommentId => {
        return fetch(`http://localhost:8000/comments/${CommentId}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
            },
            methodL: "DELETE"
        })
        .then(getComments)
    }

    const updateComment = CommentObj => {
        return fetch(`http://localhost:8000/comments/${CommentObj.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
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