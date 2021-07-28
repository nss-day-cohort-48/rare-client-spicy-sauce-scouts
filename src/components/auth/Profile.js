import React, { useEffect, useContext } from "react"
// import { HumanDate } from "../utils/HumanDate.js"
// import { ProfileContext } from "./AuthProvider.js"
import "./Profile.css"


export const Profile = (props) => {
    // const { profile, getProfile } = useContext(ProfileContext)

    // useEffect(() => {
    //     getProfile()
    // }, [])

    return (
        <article className="profile">
            <header>
                <h1>Your Profile</h1>
            </header>
            <section className="profile__info">
                <header className="profile__header">
                    <h3>Your Info</h3>
                </header>
                <div className="profile__name">
                    Welcome: Cody
                </div>
                <div className="profile__username">Username: Cody</div>
                <div className="profile__bio">About you: Cody</div>
            </section>
            <section className="profile__registrations">
                <header className="registrations__header">
                    <h3>Your Posts</h3>
                    <div class="cards">
                        <div class="cards__item">
                            Post 1
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