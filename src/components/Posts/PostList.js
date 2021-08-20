import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "./PostProvider";
import { useHistory, Link } from "react-router-dom";
import {Comment} from "../Comments/CommentList"
import {CreateComment} from "../Comments/CreateComment"
import "./Post.css"


export const PostList = (props) => {
	const { posts, getPosts, searchTerms } = useContext(PostContext);
	const [ filteredPosts, setFiltered] = useState([])
	const approvedPosts = posts.filter((post) => post.approved > 0);
	const sortedPosts = approvedPosts.sort(
		(post1, post2) =>
			Date.parse(post2.publication_date) - Date.parse(post1.publication_date)
	);
	const now = new Date();
	const filteredPostsByDate = sortedPosts.filter(
		(post) => Date.parse(post.publication_date) < now
	);


	const history = useHistory();

	useEffect(() => {
		getPosts();
	}, []);

	useEffect(() => {
		if (searchTerms !== "") {
			const subset = posts.filter(post => post.title.toLowerCase().includes(searchTerms))
			setFiltered(subset)
		}
		else {
			setFiltered(filteredPostsByDate)
		}
	},[searchTerms, posts])

	const editPostButton = (user_id, post_id) => {
		if (user_id == localStorage.getItem("rare_user_id")) {
			return (
				<button
					className="post blueText"
					id={`post--${post_id}`}
					onClick={(event) => {
						event.preventDefault();
						handleUpdatePost(post_id);
					}}
				>
					Edit Post
				</button>
			);
		} else {
			return;
		}
	};



	const handleUpdatePost = (post_id) => {
		history.push(`/posts/edit/${post_id}`);
	};

	return (
		<>
			<button
				className="create__button"
				onClick={() => history.push("/Posts/create")}
			>
				Create Post
			</button>
			<h1>Posts</h1>
			<div className="Section__Post">
				{filteredPostsByDate?.map((post) => {
					return (
						<>
							<article className="flex">
								<Link to={`/posts/${post.id}`}>{post.title}</Link>
								<div key="{firstName}">
								Author: <Link to={`../authors/${post.user.id}`}> {post.user.first_name} {post.user.last_name}</Link>
								</div>
								<div key="{category}">Category: {post.category.label}</div>
								{editPostButton(post.user_id, post.id)}
								<header className="Comment__header"><h3>Comments</h3></header>
                                    <CreateComment postid={post.id} />
                                    <Comment postid={post.id} />
							</article>
						</>
					);
				})}
			</div>
		</>
	);
};