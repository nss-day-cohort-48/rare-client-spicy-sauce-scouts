import React, {useEffect, useContext, useState} from "react"
import { useParams } from "react-router-dom";
import { PostContext } from "./PostProvider"

export const IndividualPost = () => {
    const { getPostById} = useContext(PostContext);
    const { postId } = useParams();
    const [post, setPost] = useState([])

    useEffect(() => {
        getPostById(postId).then((data) => setPost(data))
        console.log(post)
    }, [])

    return (
        <>
            <section className="Section_Post">
                <header className="profile__header"><h3>{post.title}</h3></header>
                <div className=""><img className="Post_img" src={post.image_url}/></div>
                <div>{post.content}</div>
            </section>
        </>
    )
}