/* These lines of code are importing image files (userLogo, aiLogo) and an SVG file (paperPlane) from
the assets folder. These images are likely used in the chat interface that is being rendered in the
DefaultLayout component. */

import userLogo from '../assets/img/user.png'
import aiLogo from '../assets/img/ailogo.png'
import paperPlane from '../assets/svg/paper-plane.svg'

/* These lines of code are importing necessary modules and components from the React and React Router
libraries. */

import { Navigate, Outlet } from 'react-router-dom'
import React, { useContext, useEffect, useRef } from 'react'
import { useStateContext } from '../contexts/ContextProvider'

/* Importing specific components from the React Bootstrap library, which is a set of pre-built UI
components for React applications. */

import { Card, Col, Container, Form, Row, Alert, Button, Modal } from 'react-bootstrap'
import Loader from './Loader'

/* These lines of code are importing the Axios library, which is a popular JavaScript library used for
making HTTP requests from the browser. The `useState` function is also being imported from the React
library, which is a hook used for managing state in functional components. Additionally,
`axiosClient` is being imported from a custom module located in the `../axios-client` file. This
module likely contains a pre-configured instance of the Axios library with custom settings, such as
a base URL or default headers. */

import axios from 'axios'
import { useState } from 'react'
import axiosClient from '../axios-client'



const baseURL = 'https://api.openai.com/v1/completions'
// const laravelBaseURL = 'http://backend.test/api/conversation'

function DefaultLayout() {

    const { user, messages, setMessages } = useStateContext()

    const [errors, setErrors] = useState(null)
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const messagesContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo(0, messagesContainerRef.current.scrollHeight);
        }
    }
    // const filteredMessages = messages.length > 0 && messages.filter(message => message.user_id === user.id);
    const fetchMessages = () => {
        try {

            // fetch messages from the database
            axiosClient.get('/conversation')
                .then(({ data }) => {
                    console.log("fetch data: " + data)
                    console.log(typeof data)
                    setMessages(data)

                })
                .catch(error => {
                    console.log(error);
                    alert('Error occurred while fetching messages.');
                });


            // console.log(typeof response)


        } catch (error) {
            console.log(error)
            alert('Error occurred while fetching messages....')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true)

            // create conversation history
            let convo = '';
            if (messages.length >= 1) {
                messages.map((message, index) => {
                    //console.log("messages: " + index + " " + message.user_input);
                    convo += "user_input: " + message.user_input + "\n\n" + "ai_response: " + message.ai_response + "\n\n";
                })
                convo += "user_input: " + input + "\n\n" + "ai_response: ";
            } else {
                convo = "user_input: " + input + "\n\n" + "ai_response: ";
            }

            console.log(convo);

            axios.post(baseURL, {
                model: 'text-davinci-003',
                prompt: convo,
                temperature: 0.2,
                /* It sets the maximum URL live tre url you are live request -- library for accessing API CSproject express js
                number of tokens allowed in the code to 255. Odin project toun javascript node*/
                max_tokens: 500,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.6,
                stop: [' Human:', ' AI:'],
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + import.meta.env.VITE_APP_OPENAI_API_KEY,
                },
            }).then(({ data }) => {
                setIsLoading(false)
                console.log(data)
                const aiResponse = data.choices[0].text;
                console.log(aiResponse);
                console.log(typeof aiResponse);



                const payload = {
                    user_input: input,
                    ai_response: aiResponse,
                    user_id: user.id
                }

                console.log(payload);

                axiosClient.post('/conversation', payload)

                    .then(({ data }) => {
                        console.log(data)
                        fetchMessages();

                        setInput("")
                        setErrors(null)
                    })

                    .catch(err => {
                        const response = err.response;
                        console.log(err);
                        if (response && response.status == 422) { //422 invalid data provided user input must be field.
                            console.log(response.data.errors.user_input)
                            setErrors(response.data.errors)
                            handleShow()

                        } else {
                            alert("Error: " + err)
                        }

                    })
            })

                .catch(err => {
                    setIsLoading(false)
                    console.log("401" + err)
                    alert("Error: " + err)
                })




        } catch (error) {
            console.log(error);
            alert('Error occurred while fetching data....');
        }
    };



    useEffect(() => {
        fetchMessages();
    }, [user]);

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return (
        <>
            { /** if errors exist */}

            {errors && Object.keys(errors).map(key => (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body key={key}>{errors.user_input}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>))}

            {/* {errors &&
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{errors}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>} */}

            <Container fluid className="py-5" style={{ backgroundColor: "#CDC4F9", overflowX: 'hidden' }}>
                <Row>
                    <Col md={12}>
                        <Card id="chat3" style={{ borderRadius: "15px" }}>
                            <Card.Body>
                                <Row className='d-flex justify-content-center'>



                                    <Col md={6} lg={7} xl={8}>

                                        <div style={{ height: "479px", overflowY: 'auto', backgroundColor: '#CDC4F9"' }} className="pt-3 pe-3" >

                                            <div ref={messagesContainerRef} style={{ overflowY: 'auto', height: '400px' }}>
                                                {messages.length > 0 && messages.map((message, index) => (
                                                    <div key={index}>
                                                        <div className="d-flex flex-row justify-content-start mt-4">
                                                            <img
                                                                src={userLogo}
                                                                alt="avatar 1"
                                                                style={{ width: "45px", height: "100%" }}
                                                            />
                                                            <div  >
                                                                <p
                                                                    className="small p-2 ms-3 mb-1 rounded-3"
                                                                    style={{ backgroundColor: "#f5f6f7" }}
                                                                >
                                                                    {message.user_input}
                                                                </p>
                                                            </div>
                                                        </div>


                                                        <div className="d-flex flex-row justify-content-start mt-4">
                                                            <img
                                                                src={aiLogo}
                                                                alt="avatar 1"
                                                                style={{ width: "45px", height: "100%" }}
                                                            />
                                                            <div>
                                                                <p
                                                                    className="small p-2 ms-3 mb-1 rounded-3"
                                                                    style={{ backgroundColor: "#cdc4f9c2" }}
                                                                >
                                                                    {message.ai_response}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div>

                                            </div>

                                        </div>

                                        <Form onSubmit={handleSubmit} >

                                            <Container className="text-muted d-flex justify-content-start align-items-center p-3">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    id="exampleFormControlInput2"
                                                    placeholder="Send a message."
                                                    rows={2}
                                                    value={input}
                                                    onChange={(e) => setInput(e.target.value)}
                                                />

                                                <button className="ms-3" type='submit' style={{ border: 0, backgroundColor: 'white' }} disabled={isLoading}>
                                                    {isLoading ? (
                                                        <Loader />
                                                    ) : (
                                                        <img
                                                            src={paperPlane}
                                                            alt="avatar 3"
                                                            style={{ width: "40px", height: "40px" }}
                                                        />
                                                        // <span style={{ width: "20px", height: "20px" }}>Send</span>
                                                    )}
                                                </button>
                                            </Container>

                                        </Form>


                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container >
            <Outlet />
        </>
    )

}

export default DefaultLayout

