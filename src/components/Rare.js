import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { Profile } from "./auth/Profile";
import { ProfileProvider } from "./auth/AuthProvider";
import { Post } from "./Posts/Post";
import { PostProvider } from "./Posts/PostProvider";
import { CategoryProvider } from "./Categories/CategoryProvider";
import { IndividualPost } from "./Posts/IndividualPost";
import { Createpost } from "./Posts/CreatePost";
import { CommentProvider } from "./Comments/CommentProvider"
import { TagProvider } from "./Tags/TagProvider"

export const Rare = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("rare_user_id")) {
          return (
            <>
              <NavBar />
              <Redirect to="/posts" />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route
      path="/login"
      render={() => {
        if (localStorage.getItem("rare_user_id")) {
          return <Redirect to="/" />;
        } else {
          return <Login />;
        }
      }}
    />
    <PostProvider>
      <TagProvider>
        <ProfileProvider>
          <CategoryProvider>
            <CommentProvider>
              <Route
                path="/posts/:postId(\d+)"
                render={() => {

                  return (
                    <>
                      <IndividualPost />
                    </>
                  )
                }
                }
              />
              <Route
                exact
                path="/Posts"
                render={() => {
                  if (localStorage.getItem("rare_user_id")) {
                    return (
                      <>
                        <Post />
                      </>
                    );
                  } else {
                    return <Redirect to="/" />;
                  }
                }}
              />

              <Route
                exact
                path="/posts/create"
                render={() => {
                  if (localStorage.getItem("rare_user_id")) {
                    return (
                      <>
                        <Createpost />
                      </>
                    );
                  } else {
                    return <Redirect to="/" />;
                  }
                }}
              />
              <Route
                exact
                path="/Profile"
                render={() => {
                  if (localStorage.getItem("rare_user_id")) {
                    return <Profile />;
                  } else {
                    return <Redirect to="/" />;
                  }
                }}
              />
              <Route path="/register" render={() => {
                if (localStorage.getItem("rare_user_id")) {
                  return <Redirect to="/" />
                } else {
                  return <Register />
                }
              }} />
            </CommentProvider>
          </CategoryProvider>
        </ProfileProvider>
      </TagProvider>
    </PostProvider>
  </>
)
