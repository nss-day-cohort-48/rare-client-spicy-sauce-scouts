import React, { useContext, useEffect, useState } from "react"
import { AuthorContext } from "./AuthorProvider"
import { useHistory, useParams, Link } from "react-router-dom"
import { PostContext } from "../Posts/PostProvider"

export const AuthorDetails = () => {
    const { author, getAuthorByUserId } = useContext(AuthorContext)
    const { getPostsByUserId, posts } = useContext(PostContext)

    const { authorId } = useParams()
    const history = useHistory()


    useEffect(() => {
        getAuthorByUserId(authorId)
        .then(() => getPostsByUserId(authorId))
    }, [])



    // TODO figure out how to get username from users from comments
    // TODO user provider for usernames in modules

    return (
        <>
            <div>
                <h1>{author.rareuser?.user.first_name} {author.rareuser?.user.last_name} </h1>
                <h4>{author.rareuser?.bio}</h4>
                <img src={author.image_url}></img>
                {posts.map((post) => {
                    return (
                        <>
                            <div className="user-posts">
                            <Link to={`../posts/${post.id}`}>
                                {post.title}
                                </Link>
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}