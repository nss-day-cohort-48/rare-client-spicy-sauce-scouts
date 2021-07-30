import React, { useEffect, useContext, useState } from "react"
import {PostContext} from "./PostProvider"
import {Createpost} from "./CreatePost"
import "./Post.css"
export const Post = () => {
    const { Posts, getPosts, searchTerms } = useContext(PostContext)
    const {filteredPosts, setFilteredPost} = useState([])

    const Currentuser = parseInt(localStorage.getItem("rare_user_id"))

    useEffect(() => {
        getPosts()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching words from posts title
            const subset = Posts.filter(post => post.title.toLowerCase().includes(searchTerms) || post.content.toLowerCase().includes(searchTerms))
            setFilteredPosts(subset)
        } else {
            // If the search field is blank, display all shirts
            setFilteredPosts(Posts)
        }
    }, [searchTerms, Posts])

    

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