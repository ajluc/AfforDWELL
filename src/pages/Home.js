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

    return (
        <Container fluid style={{ display: 'flex' }}>
            <MapContainer toggleWidth={toggleWidth} style={{ width: isFullWidth ? '100%' : '50%' }} />
            <CardsContainer isVisible={!isFullWidth} />
        </Container>
    )
}

export default Home