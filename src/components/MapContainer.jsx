import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Map from './Map';
import { ArrowLeft } from 'react-bootstrap-icons';
import { Container, Col, Row } from 'react-bootstrap';

const MapContainer = ({ toggleWidth, visiblePins, setVisiblePins }) => {
    const [isArrowFlipped, setIsArrowFlipped] = useState(false);

    const handleArrowClick = () => {
        setIsArrowFlipped(!isArrowFlipped);
        toggleWidth();
    };

    return (
        <div style={{ width: '100%', position: 'relative' }}>
            <Button 
                style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000}}
                onClick={handleArrowClick}
                >
                <Container>
                    <Row>
                        <Col>
                            {isArrowFlipped ? <p>Hide List</p> : <p>Show List</p>}
                        </Col>
                        <Col>
                            <ArrowLeft style={{transform: isArrowFlipped ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.6s' }}/>
                        </Col>
                    </Row>
                </Container>
            </Button>
            <div style={{ width: '100%', height: '100vh'}}>
                <Map visiblePins={visiblePins} setVisiblePins={setVisiblePins} />
            </div>

        </div>
    );
};

export default MapContainer;
