import React, { useContext, useEffect, useState } from "react"
import { PostContext  } from "./PostProvider"
import "./Post.css"


export const PostSearch = () => {
    const { posts, getPosts, setSearchTerms } = useContext(PostContext);
    const [ searchResults, setSearchResults] = useState([]);

    return (
        <>
        <div>
            <h3>Search Posts</h3>
        <input type="text" placeholder="Search by title..." onKeyUp={(event) => setSearchTerms(event.target.value)}/>
      </div>
      <br/>
      <br/>
      <br/>
        </>
    )
}