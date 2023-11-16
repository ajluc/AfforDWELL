import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const NavBar = () => {
    return (
        <Navbar variant='light' expand='lg'>
            <Container>
                <Navbar.Brand>AfforDWELL</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <ButtonGroup aria-label="Housing type toggles">
                        <Button variant="outline-primary">Rent Stabilized</Button>
                        <Button variant="outline-primary">Affordable Housing</Button>
                        <Button variant="outline-primary">All</Button>
                    </ButtonGroup>
                    <Nav>
                        <Nav.Link href="about">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar