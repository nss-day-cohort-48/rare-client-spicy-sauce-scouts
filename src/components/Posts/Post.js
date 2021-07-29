import React, { useEffect, useContext } from "react"
import {PostContext} from "./PostProvider"
import {Createpost} from "./CreatePost"
import "./Post.css"
export const Post = () => {
    const { Posts, getPosts } = useContext(PostContext)

    const Currentuser = parseInt(localStorage.getItem("rare_user_id"))

    useEffect(() => {
        getPosts()
    }, [])

    return (<>
    <Createpost/>
        <section className="Section__Post">
            {
                Posts.map(post => {
                        if(post.approved === "TRUE"){
                            return(
                                <section className="post__info">
                                <header className="profile__header"><h3>{post.title}</h3></header>
                                <div className=""><img className="Post_img" src={post.image_url}/></div>
                                <div>{post.content}</div>
                                </section>
                            )

                        }else{}


                })
            }
        </section></>
    )
}