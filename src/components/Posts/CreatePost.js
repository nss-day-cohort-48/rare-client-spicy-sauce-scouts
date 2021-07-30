import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "./PostProvider";
import { useHistory } from "react-router-dom";
import {CategoryContext} from "../Categories/CategoryProvider"
import {TagContext} from "../Tags/TagProvider"

export const Createpost = () => {
  const { getPosts, addPost } = useContext(PostContext)
  const { Categories,getCategories} = useContext(CategoryContext)
  const { Tags, getTags} = useContext(TagContext)
  const userId = localStorage.getItem('rare_user_id');
  const history = useHistory();
  const [Posts, setPosts] = useState({
    user_id: 0,
    category_id:0,
    title: "",
    publication_date: 0,
    content: "",
    image_url:"",
    tags:[],
    approved:"TRUE"
  });
  useEffect(() => {
    getPosts()
  }, []);
  useEffect(() => {
    getCategories()
  }, []);
  useEffect(() => {
    getTags()
  }, []);



  const handleControlledInputChange = (event) => {
    //making a new post
    const newPost = { ...Posts };

    newPost[event.target.id] = event.target.value;
    
    setPosts(newPost);
  };
  //if user is signed in 
  if (userId > 0) {
    Posts.user_id = parseInt(localStorage.getItem('rare_user_id'));
  }

  const handleClickSavePost = (event) => {
    event.preventDefault();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    Posts.publication_date = today;

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
            <label htmlFor="image_url">image_url:</label>
            <input
              type="text"
              id="image_url"
              required
              autoFocus
              className="form-control"
              placeholder="image_url"
              value={Posts.image_url}
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="content">content:</label>
            <input
              type="text"
              id="content"
              required
              autoFocus
              className="form-control"
              placeholder="content"
              value={Posts.content}
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>
        <fieldset className="form-control-radio">
          
          {Categories.map(Cat=>{
            return(<div className="form-group-cat">
            <label htmlFor="category_id">{Cat.label}</label>
            <input
              type="checkbox"
              id="category_id"
              required
              autoFocus
              className="form-control"
              value={Cat.id}
              onChange={handleControlledInputChange}
            />          
            </div>)
          })}

        </fieldset>
        <fieldset className="form-control-radio">
          
          {Tags.map(tag=>{
            return(<div className="form-group-cat">
            <label htmlFor="tag_id">{tag.label}</label>
            <input
              type="checkbox"
              id="tag_id"
              required
              autoFocus
              className="form-control"
              value={tag.id}
              onChange={handleControlledInputChange}
            />          
            </div>)
          })}

        </fieldset>
        <button className="btn btn-primary" onClick={handleClickSavePost}>  Submit </button>
      </form>)


}
