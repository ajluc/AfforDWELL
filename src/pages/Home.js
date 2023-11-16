// import Map from "../components/Map"
import React, { useState } from 'react';
import CardsContainer from '../components/CardsContainer';
import MapContainer from "../components/MapContainer"
import Container from 'react-bootstrap/Container';

const Home = () => {
    const [isFullWidth, setIsFullWidth] = useState(true);

    const toggleWidth = () => {
        setIsFullWidth(!isFullWidth);
    };

    const [visiblePins, setVisiblePins] = useState([])
    console.log(visiblePins)

    return (
        <Container fluid style={{ display: 'flex' }}>
            <MapContainer toggleWidth={toggleWidth} visiblePins={visiblePins} setVisiblePins={setVisiblePins} style={{ width: isFullWidth ? '100%' : '50%' }} />
            <CardsContainer isVisible={!isFullWidth} visiblePins={visiblePins}/>
        </Container>
    )
}

export default Home