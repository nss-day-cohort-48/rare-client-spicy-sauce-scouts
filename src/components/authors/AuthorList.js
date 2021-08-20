import React, { useEffect, useContext, useState } from "react"
import { AuthorContext } from "./AuthorProvider"
import { PostContext } from "../Posts/PostProvider"
import {Link} from "react-router-dom"

export const AuthorList = () => {
    const { authors, getAuthors } = useContext(AuthorContext)
    const {getPostsbyUserId, getPosts, posts} = useContext(PostContext)

    const [userPosts, setUserPosts ] = useState([])

    useEffect(() => {
        getAuthors()
        .then(() => getPosts())
    }, [])

    return (
        <>
            {

                authors.map(a => {
                    const thisUserPosts = posts.filter(p => p.user.id = a.id)
                    const userNumPosts = thisUserPosts.length
                    return (
                        <section className="Author__info" key={a.id}>
                            <div>Author Name: <Link className="author_link" to= {`authors/${a.user.id}`} >{a.user.first_name} {a.user.last_name}</Link></div>
                            <div>Total Posts: {userNumPosts}</div>
                        </section>
                    )
                })
            }
        </>
    )
}
