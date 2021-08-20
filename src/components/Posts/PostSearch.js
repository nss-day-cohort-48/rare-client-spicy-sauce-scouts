import React, { useContext, useEffect, useState } from "react"
import { PostContext  } from "./PostProvider"
import "./Post.css"


export const PostSearch = () => {
    const { posts, getPosts, setSearchTerms } = useContext(PostContext);
    const [ searchResults, setSearchResults] = useState([]);


    useEffect(() => {
        getPosts()
    }, [])
    
    const handleChange = (event) => {
        setSearchTerms(event.target.value)

    }


    return (
        <>
        <div>
            <h3>Search Posts</h3>
        <input type="text" onKeyUp={(event) => setSearchTerms(event.target.value)}/>
      </div>
        </>
    )
}