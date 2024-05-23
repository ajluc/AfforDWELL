import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer className="bg-light py-3">
            <Container>
                <Row>
                    <Col md={4} className="text-md-left">
                        <h5>Placeholder</h5>
                        <p>
                        Placeholder footer boilerplate
                        </p>
                    </Col>
                    <Col md={4}>
                        <h5>Contact</h5>
                        <ul className="list-unstyled">
                            <li>Email: info@affordwellnyc.com</li>
                            <li>Phone: n/a</li>
                        </ul>
                    </Col>
                    <Col md={4} className="text-md-right">
                        <h5>Follow Us</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-black">Facebook</a></li>
                            <li><a href="#" className="text-black">Twitter</a></li>
                            <li><a href="#" className="text-black">Instagram</a></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
