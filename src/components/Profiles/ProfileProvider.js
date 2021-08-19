import React, { useState, createContext } from "react";

// The context is imported and used by individual components that need data
export const ProfileContext = createContext();

// This component establishes what data can be used.
export const PostProvider = (props) => {
	const [profiles, setProfiles] = useState([]);
	const [profile, setProfile] = useState({});

	const getProfileByUserId = (userId) => {
		return (
			fetch(`http://localhost:8000/profiles?user=${userId}`,
			{
				headers: {
					Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
				},
			}
		)).then((res) => res.json())
		.then(setProfile)
	};

	const getPosts = () => {
		return (
			fetch(`http://localhost:8000/profiles`,
			{
				headers: {
					Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
				},
			}			
		)).then((res) => res.json())
		.then(setProfiles)
	};