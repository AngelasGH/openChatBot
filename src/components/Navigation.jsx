import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client'
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navigation() {

    const { user, messages, setUser, setToken, setMessages } = useStateContext()

    const onLogout = (e) => {
        e.preventDefault()
        axiosClient.post('/logout')
            .then(() => {
                setUser(null)
                setToken(null)
            })
    }

    const deleteConversation = () => {
        axiosClient.delete('/conversation')
            .then((response) => {
                console.log(response);
                setMessages([])
            }).catch((err) => {
                console.log(err)
            })
    }


    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" sticky="top">
            <Container>
                <Navbar.Brand href="/" style={{ color: "#9e8bfc" }}><strong >OpenAIChatBot</strong></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {/* <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link> */}

                    </Nav>
                    <Nav>
                        {messages.length > 0 && <Button className='mx-5' onClick={deleteConversation}>Clear Chats</Button>}

                        <Nav.Link>Hello! {user.name}</Nav.Link>

                        <Nav.Link onClick={onLogout}>
                            Logout
                        </Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;