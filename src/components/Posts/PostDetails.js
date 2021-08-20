import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { useHistory, useParams } from "react-router-dom"



export const PostDetails = () => {
    const {post, getPostsDetails, deletePost} = useContext(PostContext)


    const userId = parseInt(localStorage.getItem("rare_user_id"))

    const {postId} = useParams()
    const history = useHistory()


    useEffect(() => {
        getPostsDetails(postId)
    }, [])



// TODO figure out how to get username from users from comments
// TODO user provider for usernames in modules

    return (
        <>
        <div>
            <h1>{post.title}</h1>     
                <div>{post.publication_date}</div>
                <img src={post.image_url} height='300px'></img>
                <div>{post.content}</div>
                <div>Category: {post.category?.label}</div>
                <div>Author: {post.user?.first_name} {post.user?.last_name}</div>


                {post.comments?.map((comment) => {
                    return (
                        <>
                        <div style={{
                            marginTop: "3rem",
                            marginBottom: "3rem"
                        }}>
                            {comment.user.first_name} 
                            <br />
                            {comment.content}
                            
                        </div>
                        </>
                    )
                })}
                <button onClick={() => {
                    history.push(`/posts/comment/${postId}`)
                }}>Comment</button>
                <button onClick={() => {
                    deletePost(postId)
                    history.push(`/myposts`)
                }}>Delete</button>
                <button onClick={
                    () => {
                     history.push(`/posts/edit/${postId}`)   
                    }
                }>Edit</button>
        </div>
        </>
    )
}