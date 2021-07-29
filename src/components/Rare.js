import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Profile } from "./auth/Profile"
import { ProfileProvider } from "./auth/AuthProvider"
import {Post} from "./Posts/Post"
import {PostProvider} from "./Posts/PostProvider"
import { CategoryProvider } from "./Categories/CategoryProvider" 

export const Rare = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <NavBar />
                    <ApplicationViews />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <Redirect to="/" />
            } else {
                return <Login />
            }
        }} />
        <ProfileProvider>
        <CategoryProvider>
        <PostProvider>
        <Route path="/Posts" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                   <Post/>
                </>
            } else {
                return <Redirect to="/" />
            }
        }} />

            <Route path="/Profile" render={() => {
                if (localStorage.getItem("rare_user_id")) {
                    return <Profile />
                } else {
                    return <Redirect to="/" />
                }
            }} /> 
        </PostProvider>
        </CategoryProvider>
        </ProfileProvider>
        <Route path="/register" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <Redirect to="/" />
            } else {
                return <Register />
            }
        }} />
    </>
)
