import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { useHistory } from 'react-router-dom';
import "../auth/Profile.css"


export const UserPost = () => {
    const { Posts, getPosts, deletePost } = useContext(PostContext)
    const [filteredposts, setFiltered] = useState([])
    const [post, setPosts] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const history = useHistory(); // allows for rerouting

    // modal open / close functionality
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const todaysDate = new Date().toLocaleDateString() // gets today's date to display on homepage
    const userId = localStorage.getItem("rare_user_") // gets userID to use in getCurrentUser function

    // gets the current user from the database and sets the currentUser state to the user object
    const getCurrentUser = () => {
        console.log("getting Current User")
        fetch(`http://localhost:8088/users/${userId}`)
            .then(res => res.json())
            .then(setCurrentUser)
    }

    // Empty dependency array - useEffect only runs after first render
    useEffect(() => {
        getCurrentUser()
        getPosts()
    }, [])

    // when Posts is updated or changed, this useEffect gets all Posts again and sets the filtered Posts to the updated array of Posts. 
        // ******************************** LOOPING USEEFFECT **********************************
        //  useEffect(() => {
        //    getPosts().then(setFiltered(Posts))
        //  }, [Posts])
        //
        // ***************************** END OF LOOPING USEEFFECT *******************************
    useEffect(() => {
        setFiltered(Posts)
    }, [Posts])
    

    const releasePost = (postId) => {
        deletePost(postId)
    }


    // renders the html for the Posts table, add new post button and post form modal.
    return (
        <>
            <section>
                <div className="PostContainer">

                    <div>
                        {
                            filteredposts.map(post => {
                                return (
                                    <div key={post.id} onClick={() => {
                                        setPosts(post)
                                    }

                                    }>
                                        <div>{post.content}</div>
                                        <div>{post.title}</div>
                                        <div><img src={post.image_url}/></div>
                                    <button>EDIT</button>
                                    <button onClick={ () => {
                                        releasePost(post.id)
                                    }
                                    }>DELETE</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}