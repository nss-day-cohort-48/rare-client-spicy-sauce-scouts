import React, { useState, createContext } from "react";

// The context is imported and used by individual components that need data
export const AuthorContext = createContext();

// This component establishes what data can be used.
export const AuthorProvider = (props) => {
	const [authors, setAuthors] = useState([]);
	const [author, setAuthor] = useState({});

	const getAuthorByUserId = (userId) => {
		return (
			fetch(`http://localhost:8000/authors/${userId}`,
			{
				headers: {
					Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
				},
			}
		)).then((res) => res.json())
		.then(setAuthor)
	};

	const getAuthors = () => {
		return (
			fetch(`http://localhost:8000/authors`,
			{
				headers: {
					Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
				},
			}			
		)).then((res) => res.json())
		.then(setAuthors)
	}

	return (
		<AuthorContext.Provider
			value={{
				author,
				setAuthor,
				authors,
				setAuthors,
				getAuthorByUserId,
				getAuthors
			}}
		>
			{props.children}
		</AuthorContext.Provider>
	);
};