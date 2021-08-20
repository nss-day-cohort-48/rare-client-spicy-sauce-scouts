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
import { CommentProvider } from "./Comments/CommentProvider"
import { ProfileProvider } from "./auth/AuthProvider"
import { AuthorDetails } from "./authors/AuthorDetails"
import { AuthorList } from "./authors/AuthorList"
import { AuthorProvider } from "./authors/AuthorProvider"
import { PostSearch } from "./Posts/PostSearch"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
        </main>
        <ProfileProvider>
            <AuthorProvider>
                <PostProvider>
                    <CommentProvider>
                        <CategoryProvider>
                            <TagProvider>
                                <CommentProvider>
                                    <Route exact path="/MyPosts">
                                        <MyPostList />
                                    </Route>
                                    <Route exact path="/posts/create">
                                        <PostForm />
                                    </Route>
                                    <Route exact path="/posts/:postId(\d+)">
                                        <PostDetails />
                                    </Route>
                                    <Route exact path="/allposts">
                                        <PostList />
                                    </Route>
                                    <Route exact path="/posts/edit/:postId(\d+)">
                                        <PostEdit />
                                    </Route>
                                    <Route exact path="/authors">
                                        <AuthorList />
                                    </Route>
                                    <Route exact path="/authors/:authorId(\d+)">
                                        <AuthorDetails />
                                    </Route>
                                </CommentProvider>
                            </TagProvider>
                        </CategoryProvider>
                    </CommentProvider>
                </PostProvider>
            </AuthorProvider>
        </ProfileProvider>
    </>
}
