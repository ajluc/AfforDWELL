import { useState } from "react";
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { LinkContainer } from "react-router-bootstrap";
// import ToggleButton from 'react-bootstrap/ToggleButton';
// import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

const NavBar = () => {
    // const [value, setValue] = useState(1)
    // const handleClick = (val) => {
    //     setValue(val)
    //     console.log(val)
    // }
    return (
        <Navbar bg="light" expand='lg' sticky="top" style={{ height: '3.5rem'}}>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>AfforDWELL</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    {/* <ToggleButtonGroup type="radio" name="options" defaultValue={1} onChange={handleClick}>
                        <ToggleButton id="tbg-radio-1" value={1}>
                        Rent Stabilized
                        </ToggleButton>
                        <ToggleButton id="tbg-radio-2" value={2}>
                        Affordable Housing
                        </ToggleButton>
                        <ToggleButton id="tbg-radio-3" value={3}>
                        All
                        </ToggleButton>
                    </ToggleButtonGroup> */}
                    <Nav>
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/map">
                            <Nav.Link>Map</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/about">
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar