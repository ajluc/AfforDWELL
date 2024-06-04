// import Map from "../components/Map"
import { useState } from 'react';
import CardsContainer from '../components/CardsContainer';
import MapContainer from "../components/Map/MapContainer"
import Container from 'react-bootstrap/Container';
import BuildingModal from '../components/BuildingModal';
import MapFilters from '../components/MapFilters';
import DrawerContainer from '../components/BuildingDetails/DrawerContainer';

const MapPage = ({ mapSearchResult, geojson, fetchGeojson }) => {
    // State and toggle for opening and closing the cards container panel
    const [isFullWidth, setIsFullWidth] = useState(true);
    const toggleWidth = () => {
        setIsFullWidth(!isFullWidth);
    };

    // States and handleClick for modal with pin details
    const [selectedPin, setSelectedPin] = useState(null)
    const [showPinDetails, setShowPinDetails] = useState(false)
    const handlePinClick = (pin) => {
        setSelectedPin(pin)
        setShowPinDetails(true)
    }

    return (
    <div>
        {/* <MapFilters 
            availableModeToggle={availableModeToggle}
            setAvailableModeToggle={setAvailableModeToggle}/> */}
        <div style={{ display: 'flex'}}>
            <MapContainer
                toggleWidth={toggleWidth}
                handlePinClick={handlePinClick}
                style={{ width: isFullWidth ? '100%' : '50%' }} 
                mapSearchResult={mapSearchResult}
                geojson={geojson}
                fetchGeojson={fetchGeojson}
            />
            <DrawerContainer 
                isVisible={!isFullWidth}
            />
            {/* <CardsContainer
                isVisible={!isFullWidth}
                visiblePins={visiblePins}
                handlePinClick={handlePinClick}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            /> */}
            {/* <BuildingModal
                selectedPin={selectedPin}
                showPinDetails={showPinDetails}
                setShowPinDetails={setShowPinDetails}
            /> */}
        </div>
    </div>
    )
}

export default MapPage