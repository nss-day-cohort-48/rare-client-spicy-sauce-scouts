import React, { useEffect, useContext } from "react"
import { AuthorContext } from "./AuthorProvider"

export const AuthorList = () => {
    const { authors, getAuthors } = useContext(AuthorContext)

    //Why does this not get Authors?

    useEffect(() => {
        getAuthors()
        .then(() => console.log(authors))
    }, [])

    return (
        <>
            {

                authors.map(a => {
                    return (
                        <section className="Author__info" key={a.id}>
                            <div>name: {a.first_name} {a.last_name}</div>
                        </section>
                    )
                })
            }
        </>
    )
}
