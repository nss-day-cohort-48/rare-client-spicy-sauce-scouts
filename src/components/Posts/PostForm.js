import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { PostContext } from "./PostProvider";
import { CategoryContext } from "../Categories/CategoryProvider";
import { TagContext } from "../Tags/TagProvider";

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
			post.image_url === undefined ||
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
				image_url: post.image_url,
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
					<div className="center posts  blueText">
						<label htmlFor="image_url">Image Url:</label>
						<input
							value={post.image_url}
							type="image_url"
							id="image_url"
							name="image_url"
							className="center  post blueText"
							onChange={handleControlledInputChange}
						/>
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