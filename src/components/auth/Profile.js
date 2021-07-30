import React, { useEffect, useContext } from "react"
import { UserPost } from "../Posts/ViewUserPost.js"
import { HumanDate } from "../utils/HumanDate.js"
import { ProfileContext } from "./AuthProvider.js"
import "./Profile.css"


export const Profile = () => {
    const { Users, getUsers } = useContext(ProfileContext)

    const Currentuser = parseInt(localStorage.getItem("rare_user_id"))

    useEffect(() => {
        getUsers()
    }, [])

    return (
        Users.map(usr => {
            if (Currentuser === usr.id) {
                return (
                    <article className="profile">
                        <header>
                            <img className="profile__pic" src={usr.profile_image_url}/><h1>Your Profile</h1>
                        </header>
                        <section className="profile__info">
                            <header className="profile__header">
                                <h3>Your Info</h3>
                            </header>
                            <div className="profile__name">
                                Welcome: {usr.first_name} {usr.last_name}
                            </div>
                            <div className="profile__username">Username: {usr.username}</div>
                            <div className="profile__bio">About you: {usr.bio}</div>
                        </section>
                        <section className="profile__registrations">
                            <header className="registrations__header">
                                <h3>Your Posts</h3>
                                <div class="cards">
                                    <div class="cards__item">
                                        <UserPost/>
                                        
                                    </div>
                                    <div class="cards__item">
                                        Post 1
                                    </div>
                                    <div class="cards__item">
                                        Post 1
                                    </div>

                                </div>
                            </header>
                            <div className="registrations">

                            </div>
                        </section>
                        <section className="profile__games">
                            <header className="games__header">
                                <h3>Your Subscriptons</h3>
                            </header>
                            <div className="games">

                            </div>
                        </section>
                    </article>

                )
            }
        })

    )
}