import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {CommentContext} from "./CommentProvider"

export const CreateComment = ({postid}) => {
  const {addComment } = useContext(CommentContext)
  const userId = localStorage.getItem('rare_user_id');
  const history = useHistory();
  const [Comments, setComments] = useState({
    post_id: 0,
    author_id:0,
    content: ""
  });



  const handleControlledInputChange = (event) => {
    //making a new post
    const newComment = { ...Comments };

    newComment[event.target.id] = event.target.value;
    
    setComments(newComment);
  };
  //if user is signed in 
  if (userId > 0) {
    Comments.post_id = postid
    Comments.author_id = parseInt(localStorage.getItem('rare_user_id'));
  }

  const handleClickSavePost = (event) => {
    event.preventDefault();

    //checking to see if the user has input a latitude
    if (Comments.content === "") {
      window.alert("Enter a comment");
    } else {
        addComment(Comments).then(() => history.push("/"));
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
