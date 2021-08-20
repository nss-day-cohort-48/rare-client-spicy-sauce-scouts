import React, { useContext, useEffect, useState } from "react"
import { AuthorContext } from "./AuthorProvider"
import { useHistory, useParams } from "react-router-dom"



export const AuthorDetails = () => {
    const {author, getAuthorByUserId } = useContext(AuthorContext)

    const {authorId} = useParams()
    const history = useHistory()


    useEffect(() => {
        getAuthorByUserId(authorId)
    }, [])



// TODO figure out how to get username from users from comments
// TODO user provider for usernames in modules

    return (
        <>
        <div>
            <h1>{author.user.first_name} {author.user.last_name}</h1>     
                {/* <div>{Author.publication_date}</div>
                <img src={Author.image_url}></img>
                <div>{Author.content}</div>
                <div>Category: {Author.category?.label}</div>
                <div>Author: {Author.user?.first_name} {Author.user?.last_name}</div>


                {Author.comments?.map((comment) => {
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
                    history.push(`/Authors/comment/${AuthorId}`)
                }}>Comment</button>
                <button onClick={() => {
                    deleteAuthor(AuthorId)
                    history.push(`/myAuthors`)
                }}>Delete</button>
                <button onClick={
                    () => {
                     history.push(`/Authors/edit/${AuthorId}`)   
                    }
                }>Edit</button> */}
        </div>
        </>
    )
}