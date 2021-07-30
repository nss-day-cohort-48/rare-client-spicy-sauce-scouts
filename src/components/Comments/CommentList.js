import React, { useEffect, useContext } from "react"
import {CommentContext} from "./CommentProvider"
import { ProfileContext } from "../auth/AuthProvider"

export const Comment = ({postid}) => {
    const { Comments, getComments } = useContext(CommentContext)
    const { Users, getUsers } = useContext(ProfileContext)

    useEffect(() => {
        getComments()
    }, [])
    useEffect(() => {
        getUsers()
    }, [])

    return (<>
            {
                
                Comments.map(Cmt => {
                    if (postid === Cmt.post_id){
                        let userid = ""
                        for (const user of Users) {
                            if (user.id === Cmt.author_id) {
                                userid = user.first_name
                            }
                        }
                        return(
                                <section className="Comment__info">
                                <div>{userid}: {Cmt.content}</div>
                                </section>
                        )}

                })
            }
        </>
    )
}