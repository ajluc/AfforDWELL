// import Map from "../components/Map"
import { useState } from 'react';
import CardsContainer from '../components/CardsContainer';
import MapContainer from "../components/Map/MapContainer"
import DrawerContainer from '../components/BuildingDetails/DrawerContainer';

const MapPage = ({ mapSearchResult, geojson, fetchGeojson, currentBuilding, setCurrentBuilding }) => {
    // State and toggle for opening and closing the cards container panel
    const [isFullWidth, setIsFullWidth] = useState(true);
    const [isArrowFlipped, setIsArrowFlipped] = useState(false)

    const toggleWidth = () => {
        setIsFullWidth(!isFullWidth);
    };

    // States and handleClick for drawer with pin details
    const handlePinClick = (pin) => {
        setIsFullWidth(false)
        setIsArrowFlipped(true)
        setCurrentBuilding(pin)
    }

    return (
    <div>
        {/* <MapFilters 
            availableModeToggle={availableModeToggle}
            setAvailableModeToggle={setAvailableModeToggle}/> */}
        <div style={{ display: 'flex'}}>
            <MapContainer
                toggleWidth={toggleWidth}
                setIsFullWidth={setIsFullWidth}
                isArrowFlipped={isArrowFlipped}
                setIsArrowFlipped={setIsArrowFlipped}
                handlePinClick={handlePinClick}
                style={{ width: isFullWidth ? '100%' : '50%' }} 
                mapSearchResult={mapSearchResult}
                geojson={geojson}
                fetchGeojson={fetchGeojson}
                setCurrentBuilding={setCurrentBuilding}
            />
            <DrawerContainer 
                key={currentBuilding?.ucbbl}
                isVisible={!isFullWidth}
                currentBuilding={currentBuilding}
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