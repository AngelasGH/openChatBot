import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client'

function Navigation({ user }) {

    const { setUser, setToken } = useStateContext()

    const onLogout = (e) => {
        e.preventDefault()
        axiosClient.post('/logout')
            .then(() => {
                setUser(null)
                setToken(null)
            })
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" sticky="top">
            <Container>
                <Navbar.Brand href="#home" style={{ color: "#9e8bfc" }}><strong >OpenChatBot</strong></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {/* <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link> */}

                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">Hello! {user.name}</Nav.Link>
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