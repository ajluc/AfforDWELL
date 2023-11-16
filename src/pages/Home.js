// import Map from "../components/Map"
import { useState } from 'react';
import CardsContainer from '../components/CardsContainer';
import MapContainer from "../components/MapContainer"
import Container from 'react-bootstrap/Container';
import BuildingModal from '../components/BuildingModal';

const Home = () => {
    // State and toggle for opening and closing the cards container panel
    const [isFullWidth, setIsFullWidth] = useState(true);
    const toggleWidth = () => {
        setIsFullWidth(!isFullWidth);
    };

    // State for which pins are visible in the current map bounds
    const [visiblePins, setVisiblePins] = useState([])

    // States and handleClick for modal with pin details
    const [selectedPin, setSelectedPin] = useState(null)
    const [showPinDetails, setShowPinDetails] = useState(false)
    const handlePinClick = (pin) => {
        setSelectedPin(pin)
        setShowPinDetails(true)
    }

    return (
        <Container fluid style={{ display: 'flex' }}>
            <MapContainer
                toggleWidth={toggleWidth}
                setVisiblePins={setVisiblePins}
                handlePinClick={handlePinClick}
                style={{ width: isFullWidth ? '100%' : '50%' }} 
            />
            <CardsContainer
                isVisible={!isFullWidth}
                visiblePins={visiblePins}
                handlePinClick={handlePinClick}
            />
            <BuildingModal
                selectedPin={selectedPin}
                showPinDetails={showPinDetails}
                setShowPinDetails={setShowPinDetails}
            />
        </Container>
    )
}

export default Home