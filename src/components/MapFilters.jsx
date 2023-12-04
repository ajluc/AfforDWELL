import { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const MapFilters = ({availableModeToggle, setAvailableModeToggle}) => {
    const [minPrice, setMinPrice] = useState()
    const [maxPrice, setMaxPrice] = useState()
    const [beds, setBeds] = useState()
    const [baths, setBaths] = useState()

    const handleMinPrice = (eventKey) => {
        setMinPrice(eventKey)
    }
    // Future task: Disable numbers below min for max and vice versa
    const handleMaxPrice = (eventKey) => {
        setMaxPrice(eventKey)
    }
    const handleBeds = (eventKey) => {
        setBeds(eventKey)
    }
    const handleBaths = (eventKey) => {
        setBaths(eventKey)
    }
    const handleToggle = () => {
        setAvailableModeToggle(!availableModeToggle)
    }

    return (
        <Navbar bg="light" expand='lg' sticky="top" style={{ height: '3rem'}}>
            <Container>
                <Form>
                    <Row>
                        <Col xs="auto">
                            <Form.Control
                            type="text"
                            placeholder="Search the map"
                            />
                        </Col>
                        <Col xs="auto">
                            <Button type="submit">Search</Button>
                        </Col>
                    </Row>
                </Form>
                
                <DropdownButton title={minPrice || "Min Price"} onSelect={handleMinPrice}>
                    <Dropdown.Item as="button" eventKey='$0'>No Min</Dropdown.Item> 
                    <Dropdown.Divider />
                    <Dropdown.Item as="button" eventKey='$500'>$500</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$1k'>$1,000</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$1.5k'>$1,500</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$2k'>$2,000</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$2.5k'>$2,500</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$3k'>$3,000</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$3.5k'>$3,500</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$4k'>$4,000</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$4.5k'>$4,500</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$5k'>$5,000</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$6k'>$6,000</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$7k'>$7,000</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$8k'>$8,000</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$9k'>$9,000</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$10k'>$10,000</Dropdown.Item>
                </DropdownButton>
                <p> to </p>
                <DropdownButton title={maxPrice || "Max Price"} onSelect={handleMaxPrice}>
                    <Dropdown.Item as="button" eventKey={'$15k+'}>No Max</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item as="button" eventKey='$500'>$500</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$1k'>$1,000</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$1.5k'>$1,500</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$2k'>$2,000</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$2.5k'>$2,500</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$3k'>$3,000</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$3.5k'>$3,500</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$4k'>$4,000</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$4.5k'>$4,500</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$5k'>$5,000</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$6k'>$6,000</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$7k'>$7,000</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$8k'>$8,000</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$9k'>$9,000</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$10k'>$10,000</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$12.5k'>$12,500</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='$15k'>$15,000</Dropdown.Item>
                </DropdownButton>
                <DropdownButton title={beds || "Beds"} onSelect={handleBeds}>
                    <Dropdown.Item as="button" eventKey={"Any Beds"}>Any</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item as="button" eventKey='Studio+'>Studio</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='1+ Beds'>1+ Beds</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='2+ Beds'>2+ Beds</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='3+ Beds'>3+ Beds</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='4+ Beds'>4+ Beds</Dropdown.Item>
                </DropdownButton>
                <DropdownButton title={baths || "Baths"} onSelect={handleBaths}>
                    <Dropdown.Item as="button" eventKey={"Any Baths"}>Any</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item as="button" eventKey='1+ Baths'>1+ Baths</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='1.5+ Baths'>1.5+ Baths</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='2+ Baths'>2+ Baths</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey='3+ Baths'>3+ Baths</Dropdown.Item>
                </DropdownButton>
                <Form>
                    <Form.Check
                        type="switch"
                        label="Available listings only"
                        checked={availableModeToggle}
                        onChange={handleToggle}
                    />
                </Form>
            </Container>
        </Navbar>
    )
}

export default MapFilters