import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {CommentContext} from "./CommentProvider"
import "./Comment.css"

export const CreateComment = ({postid}) => {
  const {addComment } = useContext(CommentContext)
  const userId = localStorage.getItem('rare_user_id');
  const history = useHistory();
  const [Comments, setComments] = useState({
    post: 1,
    author: 1,
    content: "",
    created_on: ""
  });

  const handleControlledInputChange = (event) => {
    //making a new post
    const newComment = { ...Comments };

    newComment[event.target.id] = event.target.value;
    
    setComments(newComment);
  };


  const handleClickSavePost = (event) => {
    event.preventDefault();
    Comments.post = postid
    Comments.author = userId
    //checking to see if the user has input content
    if (Comments.content === "") {
      window.alert("Enter a comment");
    } else {
        addComment(Comments).then(() => history.push("/Posts"));
    }
  };

  //render the from to make new posts
  return (
      <form className="postForm">
        <h2 className="postForm__title"></h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="content"></label>
            <input
              type="text"
              id="content"
              required
              autoFocus
              className="form-control"
              placeholder="Comment"
              value={Comments.content}
              onChange={handleControlledInputChange}
            />
          </div>
          <button className="btn btn-primary" onClick={handleClickSavePost}>  Submit </button>
        </fieldset>
      </form>)


}