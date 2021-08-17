import React, { useContext } from "react"
import { PostContext  } from "./PostProvider"
import "./Post.css"


export const PostSearch = () => {
    const { setSearchTerms } = useContext(PostContext)

    return (
        <>
        Search:
        <input type="text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value.toLowerCase())}
        placeholder="Search Posts..."/>
        </>
    )
} 