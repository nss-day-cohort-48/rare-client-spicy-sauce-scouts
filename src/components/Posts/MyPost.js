import React, { useContext, useEffect, useState} from "react"
import { PostContext } from "./PostProvider"
import { Link, useHistory } from "react-router-dom";

export const MyPostList = props => {
    const {posts, getPosts} = useContext(PostContext)
    const [filteredPosts, setFilteredPosts] = useState([])
    const currentUserId = localStorage.getItem("rare_user_id")
    const currentUsername = localStorage.getItem("rare_username")
    const history = useHistory();

    useEffect(() => {
        getPosts()
      }, [])

      useEffect(() => {
        let filter = posts.filter(post => post.user.username === currentUsername)
        setFilteredPosts(filter)
      }, [posts])
        
        
        if (posts.length > 0) {
          
          console.log(posts)
          console.log(currentUserId)
          return (
    <>
        <button
        className="create__button"
        onClick={() => history.push("/Posts/create")}
        >
        Create Post
      </button>
        <div>
            <h1>My Posts</h1>
            {
              filteredPosts?.map(post => {
                
                return (
                  <>
                        <article className="flex">
                        <Link to={`/posts/${post.id}`}>{post.title}</Link>
                        <div>{post.category.label}</div>
                        <div>{post.user.first_name} {post.user.last_name}</div>
                        </article>
                        </>
                    )
                  })
            }
        </div>
        </>
    )
  } else {
    return (
      <>
        <button
        className="create__button"
        onClick={() => history.push("/Posts/create")}
        >
        Create Post
      </button>
      <h1>No Posts Available</h1>

      </>
    )
  }
}