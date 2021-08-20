import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { PostContext } from "./PostProvider";
import { CategoryContext } from "../Categories/CategoryProvider";
import { TagContext } from "../Tags/TagProvider";
import { FileUpload } from "./photoUpload";

export const PostForm = () => {
	const { createPost } = useContext(PostContext);
	const { categories, getCategories } = useContext(CategoryContext);
	const { tags, getTags } = useContext(TagContext);

	const [post, setPosts] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const [postTags, setPostTags] = useState([]);

	const history = useHistory();

	const handleControlledInputChange = (event) => {
		const newPost = { ...post };
		newPost[event.target.name] = event.target.value;
		setPosts(newPost);
	};
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

	useEffect(() => {
		getCategories();
		getTags();
	}, []);

	useEffect(() => {
		if (isLoading === false) {
			return;
		} else {
			handleSavePost();
		}
	}, [isLoading]);

	const checkForm = () => {
		if (
			// post.category_id === undefined ||
			post.title === undefined ||
			url === undefined ||
			post.content === undefined
		) {
			return false;
		} else {
			return true;
		}
	};

	const handleSavePost = () => {
		const userId = localStorage.getItem("rare_user_id");
		if (checkForm() === true) {
			console.log(userId)
			createPost({
				user_id: userId,
				category_id: 1,
				// category_id: parseInt(post.category_id),
				title: post.title,
				image_url: url,
				content: post.content,
				approved: parseInt(1),
				tags: postTags,
			}).then(() => history.push("/myposts"));
		} else {
			window.alert("Please fill in all form fields before submitting post.");
			setIsLoading(false);
		}
	};

	return (
		<>
			<h1 className="goldenRodText center">New Post</h1>

			<form className="flex post">
				<fieldset>
					<div className="center posts  blueText">
						<label htmlFor="category">Category:</label>
						<select
							value={post.category_id}
							name="category_id"
							id="category_id"
							className="center  post blueText"
							onChange={handleControlledInputChange}
						>
							<option value="0">Select Category </option>
							{categories?.map((category) => (
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
						<input
							value={post.title}
							type="title"
							id="title"
							name="title"
							className="center  post blueText"
							onChange={handleControlledInputChange}
						/>
					</div>
				</fieldset>
				<fieldset>
				<div>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
                    <button onClick={(event) => {
						event.preventDefault()
						uploadImage()
				} }>Upload</button>
                </div>
                <div>
                    <img style={{ width: "250px" }} src={url} />
                </div>
				</fieldset>
				<fieldset>
					<div className="center posts  blueText">
						<label htmlFor="content">Content:</label>
						<textarea
							value={post.content}
							type="content"
							id="content"
							name="content"
							className="center  post blueText"
							onChange={handleControlledInputChange}
						/>
					</div>
				</fieldset>
				<fieldset>
					<div className="center posts  blueText">
						{tags?.map((tag) => (
							<>
								<input
									type="checkbox"
									key={tag.id}
									value={tag.id}
									onClick={(event) => {
										const copyPostTags = [...postTags];
										const idPosition = copyPostTags.indexOf(tag);
										if (idPosition >= 0) {
											copyPostTags.splice(idPosition, 1);
										} else {
											copyPostTags.push(tag);
										}
										setPostTags(copyPostTags);
									}}
								/>
								<div>{tag.label}</div>
							</>
						))}
					</div>
				</fieldset>

				<button
					className="center post blueText"
					disabled={isLoading}
					onClick={(event) => {
						setIsLoading(true);
						event.preventDefault();
					}}
				>
					Save Post
				</button>
			</form>
		</>
	);
};