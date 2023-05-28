import React from 'react'

function Home() {
    return (
        <section id="home">
            <div className="container position">
                <h1>Welcome to the<br /><span>OpenAIChatBot</span><br />Application!</h1>
                <a href="/chats"><button className="btn-sn mt-3">Let's Chat</button></a>
            </div>
        </section>
    )
}

export default Home