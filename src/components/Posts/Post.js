import React, { useEffect, useContext, useState } from "react"
import { PostContext } from "./PostProvider"
import { Createpost } from "./PostForm"
import "./Post.css"
import { Comment } from "../Comments/CommentList"
import { CreateComment } from "../Comments/CreateComment"
import { useHistory } from "react-router-dom"
import {Comment} from "../Comments/CommentList"
import {CreateComment} from "../Comments/CreateComment"

export const Post = () => {
    const { Posts, getPosts, searchTerms } = useContext(PostContext)
    const history = useHistory()
    const [filteredPosts, setFiltered] = useState([])

    const Currentuser = parseInt(localStorage.getItem("rare_user_id"))

    useEffect(() => {
        getPosts()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching words from posts title
            const subset = Posts.filter(post => post.title.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            // If the search field is blank, display all posts
            setFiltered(Posts)
        }
    }, [searchTerms, Posts])



    return (
        <>
            <section className="Section__Post">
                {
                    filteredPosts.map(post => {
                        if (post.approved === "TRUE") {
                            return (
                                <section className="post__info">
                                    <header className="profile__header"><h3>{post.title}</h3></header>
                                    <div className=""><img className="Post_img" src={post.image_url} /></div>
                                    <div>{post.content}</div>
                                    <header className="Comment__header"><h3>Comments</h3></header>
                                    <CreateComment postid={post.id} />
                                    <Comment postid={post.id} />
                                </section>
                            )
                        }
                    })
                }
            </section>
        </>
    )
}