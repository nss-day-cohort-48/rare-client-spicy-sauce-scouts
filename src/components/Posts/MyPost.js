import React, { useContext, useEffect} from "react"
import { PostContext } from "./PostProvider"
import { Link, useHistory } from "react-router-dom";

export const MyPostList = props => {
    const {posts, getPostsByUserId} = useContext(PostContext)
    const currentUserId = parseInt(localStorage.getItem("rare_user_id"))
    const history = useHistory();

    useEffect(() => {
        getPostsByUserId(currentUserId)
    }, [])

    const editPostButton = (user_id, post_id) => {
        if (user_id == localStorage.getItem("rare_user_id")) {
            return <button
            className="post blueText"
            id={`post--${post_id}`}
            onClick={(event) => {
              event.preventDefault();
              handleUpdatePost(post_id);
            }}
          >
            Edit Post
          </button>
          }
          else {
            return 
          }
        }

        const handleUpdatePost = (post_id) => {
            history.push(`/posts/edit/${post_id}`);
          };



    return (
        <>
        <button
        className="create__button"
        onClick={() => history.push("/Posts/create")}
        >
        Create Post?
      </button>
        <div>
            <h1>My Posts</h1>
            {
                posts.map(post => {
                    return (
                        <>
                        <article className="flex">
                        <Link to={`/posts/${post.id}`}>{post.title}</Link>
                        <div>{post.category.label}</div>
                        <div>{post.user.first_name} {post.user.last_name}</div>
                        {editPostButton(post.user_id, post.id)}
                        </article>
                        </>
                    )
                })
            }
        </div>
        </>
    )
}