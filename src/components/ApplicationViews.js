import React from "react"
import { Route } from "react-router-dom"
import { PostForm } from "./Posts/PostForm"
import { PostProvider } from "./Posts/PostProvider"
import { MyPostList } from "./Posts/MyPost"
import { PostDetails } from "./Posts/PostDetails"
import { PostList } from "./Posts/PostList"
import { PostEdit } from "./Posts/EditPost"
import { CategoryProvider } from "./Categories/CategoryProvider"
import { TagProvider } from "./Tags/TagProvider"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            </main>
            <PostProvider>
                <CategoryProvider>
                    <TagProvider>
                <Route exact path="/myposts">
                    <MyPostList />
                </Route>
                <Route exact path="/posts/create">
                    <PostForm />
                </Route>
                <Route exact path="/posts/:postId(\d+)">
                    <PostDetails />
                </Route>
                <Route exact path="/posts">
                    <PostList />
                </Route>
                <Route exact path="/posts/edit/:postId(\d+)">
                    <PostEdit />
                </Route>
                    </TagProvider>
                </CategoryProvider>
            </PostProvider>

    </>
}
