import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { PostContext } from "./PostProvider";
import { CategoryContext } from "../Categories/CategoryProvider";


export const PostEdit = () => {
    const { post, setPost, updatePost, getPostsDetails } = useContext(PostContext)
    const { categories, getCategories} = useContext(CategoryContext)

    const [isLoading, setIsLoading] = useState(false);

	const history = useHistory();
    const { postId } = useParams();

    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const uploadImage = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "myUpload")
        data.append("cloud_name", "kritikillz")
        fetch("https://api.cloudinary.com/v1_1/kritikillz/image/upload", {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                setUrl(data.url)
            })
            .catch(err => console.log(err))
    }

    const handleControlledInputChange = (event) => {
      const editPost = { ...post }
      editPost[event.target.name] = event.target.value
      setPost(editPost)
    }

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
      setUrl(post.image_url)
    },[post])

    useEffect(() => {
      if (isLoading === false) {
        return
      }
      else {
        handleSavePost()
      }
        }, [isLoading])


    
    // state is undefined
    useEffect(() => {
        getPostsDetails(postId)
        console.log(post)
      }, [postId])




    const checkForm = () => {
      if (
        // post.category_id === undefined ||
        post.title === undefined ||
        url === undefined ||
        post.content === undefined
      ){return false}
      else {return true}
    }

    



    const handleSavePost = () => {
        // const userId = localStorage.getItem("rare_user_id")
        console.log("saving post")
        if (checkForm() === true) {
            updatePost({
            id: postId,
            category_id: parseInt(post.category_id),
            title: post.title,
            image_url: url,
            content: post.content,
        })
        .then(() => history.push("/myposts"))
        }  
        else {
          window.alert('Please fill in all form fields before submitting post.')
          setIsLoading(false)
        }
      }


    return (
      <>
      <h1 className="goldenRodText center">Edit Post</h1>

        <form className="flex post">
        <fieldset>
          <div className="center posts  blueText">
            <label htmlFor="category">Category:</label>
            <select value={post.category_id} name="category_id" id="category_id" className="center  post blueText" onChange={handleControlledInputChange}>
              <option value="0">Select Category </option>
              {categories?.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className="center posts  blueText">
            <label htmlFor="title">Post Title:</label>
            <input value={post.title} type="title" id="title" name="title" className="center  post blueText" onChange={handleControlledInputChange}/>
          </div>
        </fieldset>
        <fieldset>
        <div>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
                    <button onClick={(event) => {
						event.preventDefault()
						uploadImage()
				} }>Upload</button>
        <br/>
        <img style={{ width: "250px" }} src={url} />
                </div>
          
        </fieldset>
        <fieldset>
          <div className="center posts  blueText">
            <label htmlFor="content">Content:</label>
            <textarea value={post.content} type="content" id="content" name="content" className="center  post blueText" onChange={handleControlledInputChange}/>
          </div>
        </fieldset>
        
        <button className="center post blueText"
          disabled={isLoading}
          onClick={event => {
            setIsLoading(true)
            event.preventDefault()

          }}>Edit Post</button>
        </form>
        </>
    )
}