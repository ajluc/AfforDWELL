// import Map from "../components/Map"
import { useState } from 'react';
import CardsContainer from '../components/CardsContainer';
import MapContainer from "../components/MapContainer"
import Container from 'react-bootstrap/Container';
import BuildingModal from '../components/BuildingModal';
import MapFilters from '../components/MapFilters';
import ConstructionModal from '../components/UnderConstructionModal';

const MapPage = () => {
    // State and toggle for opening and closing the cards container panel
    const [isFullWidth, setIsFullWidth] = useState(true);
    const toggleWidth = () => {
        setIsFullWidth(!isFullWidth);
    };

    // State for toggling between Data Mode and Available Listings Mode
    const [availableModeToggle, setAvailableModeToggle] = useState(false)


    // State for which pins are visible in the current map bounds
    const [visiblePins, setVisiblePins] = useState([])

    // States and handleClick for modal with pin details
    const [selectedPin, setSelectedPin] = useState(null)
    const [showPinDetails, setShowPinDetails] = useState(false)
    const handlePinClick = (pin) => {
        setSelectedPin(pin)
        setShowPinDetails(true)
    }

    const [currentPage, setCurrentPage] = useState(1)

    return (
    <div>
        {/* <ConstructionModal /> */}
        {/* <MapFilters 
            availableModeToggle={availableModeToggle}
            setAvailableModeToggle={setAvailableModeToggle}/> */}
        <div style={{ display: 'flex'}}>
            <MapContainer
                toggleWidth={toggleWidth}
                setVisiblePins={setVisiblePins}
                handlePinClick={handlePinClick}
                style={{ width: isFullWidth ? '100%' : '50%' }} 
                setCurrentPage={setCurrentPage}
                availableModeToggle={availableModeToggle}
            />
            <CardsContainer
                isVisible={!isFullWidth}
                visiblePins={visiblePins}
                handlePinClick={handlePinClick}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <BuildingModal
                selectedPin={selectedPin}
                showPinDetails={showPinDetails}
                setShowPinDetails={setShowPinDetails}
            />
        </div>
    </div>
    )
}

export default MapPage