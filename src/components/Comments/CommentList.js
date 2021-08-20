import React, { useEffect, useContext } from "react"
import {CommentContext} from "./CommentProvider"

export const Comment = ({postid}) => {
    const { Comments, getComments,deleteComment } = useContext(CommentContext)

    useEffect(() => {
        getComments()
    }, [])


    const DeleteComment = (event) => {

        deleteComment(event);
      };

    return (<>
            {
                
                Comments.map(Cmt => {
                    if (postid === Cmt.post.id){

                        return(
                                <section className="Comment__info" key={Cmt.id}>
                                <div>{Cmt.author.first_name} {Cmt.author.last_name}: "{Cmt.content}" {Cmt.created_on}</div>                             
                                
                                </section>
                        )}
                        

                })
            }
        </>
    )
}