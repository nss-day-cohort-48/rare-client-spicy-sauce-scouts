import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "./PostProvider";
import { useHistory } from "react-router-dom";

export const Createpost = () => {
  const { getPosts, addPost } = useContext(PostContext)
  const userId = localStorage.getItem('poop_usr');
  const history = useHistory();
  const [Posts, setPosts] = useState({
    user_id: 0,
    category_id:0,
    title: "",
    publication_date: 0,
    content: "",
    image_url:"",
    approved:""
  });
  useEffect(() => {
    getPosts()
  }, []);


  const handleControlledInputChange = (event) => {
    //making a new post
    const newPost = { ...Posts };

    newPost[event.target.id] = event.target.value;

    setPosts(newPost);
  };
  //if user is signed in 
  if (userId > 0) {
    Posts.user_id = parseInt(localStorage.getItem('rare_usr_id'));
  }

  const handleClickSaveAnimal = (event) => {
    event.preventDefault();

    //checking to see if the user has input a latitude
    if (Posts.name === "") {
      window.alert("Please select a location and a customer");
    } else {
      addPost(Posts).then(() => history.push("/"));
    }
  };

  //render the from to make new posts
  return (
      <form className="postForm">
        <h2 className="postForm__title"></h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              required
              autoFocus
              className="form-control"
              placeholder="title"
              value={Posts.title}
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              required
              autoFocus
              className="form-control"
              placeholder="description"
              value={Posts.description}
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="latitude">Latitude:</label>
            <input
              type="text"
              id="latitude"
              required
              autoFocus
              className="form-control"
              placeholder="latitude"
              value={Posts.latitude}
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="longitude">Longitude:</label>
            <input
              type="text"
              id="longitude"
              required
              autoFocus
              className="form-control"
              placeholder="longitude"
              value={Posts.longitude}
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>
        <button className="btn btn-primary" onClick={handleClickSaveAnimal}>  Submit </button>
      </form>)


}
