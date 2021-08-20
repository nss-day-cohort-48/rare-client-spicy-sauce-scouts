import React, { useState, createContext } from "react";

// The context is imported and used by individual components that need data
export const PostContext = createContext();

// This component establishes what data can be used.
export const PostProvider = (props) => {
	const [searchTerms, setSearchTerms] = useState("");
	const [posts, setPosts] = useState([]);
	const [post, setPost] = useState({});

	const getPostsByUserId = (userId) => {
		return (
			fetch(`http://localhost:8000/posts?user=${userId}`,
			{
				headers: {
					Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
				},
			}
		)).then((res) => res.json())
		.then(setPosts)
	};

	const getPosts = () => {
		return (
			fetch(`http://localhost:8000/posts`,
			{
				headers: {
					Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
				},
			}			
		)).then((res) => res.json())
		.then(setPosts)
	};

	const deletePost = (postId) => {
		return fetch(`http://localhost:8000/posts/${postId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
			},
		});
	};
	const createPost = (postObject) => {
		return fetch("http://localhost:8000/posts", {
			method: "POST",
			headers: {
				Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(postObject),
		}).then(getPosts);
	};

	const getPostsDetails = (postId) => {
		return (
			fetch(`http://localhost:8000/posts/${postId}`,
			{
				headers: {
					Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
				},
			}		
		)).then((res) => res.json())
		.then(setPost)
	};

	const updatePost = (updatedPost) => {
		return fetch(`http://localhost:8000/posts/${updatedPost.id}`, {
			method: "PUT",
			headers: {
				Authorization: `Token ${localStorage.getItem("rare_user_id")}`,

				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedPost),
		}).then(getPosts);
	};

	return (
		<PostContext.Provider
			value={{
				posts,
				setPosts,
				post,
				setPost,
				getPostsByUserId,
				getPostsDetails,
				getPosts,
				deletePost,
				createPost,
				updatePost,
				searchTerms,
				setSearchTerms
			}}
		>
			{props.children}
		</PostContext.Provider>
	);
};