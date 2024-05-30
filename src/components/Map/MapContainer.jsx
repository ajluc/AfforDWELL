import { useState, useEffect } from 'react';
// import Map from './Map';
import Map2 from './Map2';
import { SearchBox } from '@mapbox/search-js-react';

import Button from 'react-bootstrap/Button';
import { ArrowLeft } from 'react-bootstrap-icons';
import Stack from 'react-bootstrap/Stack'
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

const MapContainer = ({ toggleWidth, visiblePins, setVisiblePins, handlePinClick, setCurrentPage, availableModeToggle, mapSearchResult }) => {
    const [isArrowFlipped, setIsArrowFlipped] = useState(false);
    const [mapInstance, setMapInstance] = useState(null)

    const handleSearch = (query) => {
        if (query && mapInstance) {
            const [lon, lat] = query.features[0].geometry.coordinates
            mapInstance.easeTo({
                center: [lon, lat],
                zoom: 18
            })
        }
    }

    // When navigating to map from landing page's search bar, run handleSearch function
    useEffect(() => {
        if (mapSearchResult && mapInstance) {
            handleSearch(mapSearchResult)
        }
    }, [mapSearchResult, mapInstance])

    const handleArrowClick = () => {
        setIsArrowFlipped(!isArrowFlipped);
        toggleWidth();
    };

    const [toggleValue, setToggleValue] = useState(3)
    const handleToggleClick = (val) => {
        setToggleValue(val)
        setCurrentPage(1)
    }

    return (
        <div style={{ width: '100%', position: 'relative' }}>
            {/* <ToggleButtonGroup
                type="radio" 
                name="options" 
                defaultValue={3} 
                onChange={handleToggleClick} 
                style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000}}
            >
                <ToggleButton id="stabilized" value={1}>
                Rent Stabilized
                </ToggleButton>
                <ToggleButton id="affordable" value={2}>
                Affordable Housing
                </ToggleButton>
                <ToggleButton id="all" value={3}>
                All
                </ToggleButton>
            </ToggleButtonGroup>
            <Button 
                style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000}}
                onClick={handleArrowClick}
                >
                <Stack direction='horizontal'>
                    {isArrowFlipped ? <p style={{marginBottom: "0px", marginRight: "10px"}}>Hide List</p> : <p style={{marginBottom: "0px", marginRight: "10px"}}>Show List</p>}
                    <ArrowLeft style={{transform: isArrowFlipped ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.6s' }}/>
                </Stack>
            </Button> */}
            <SearchBox 
                accessToken={process.env.REACT_APP_MAPBOX_API_TOKEN}
                onRetrieve={handleSearch}
                placeholder='Search for a NYC address'
                value={null}
                options={{
                    bbox: '-74.25909,40.477399,-73.700272,40.917577',  // NYC bounding box
                    types: 'address',
                }}
            />
            <div style={{ width: '100%', height: 'calc(100vh - 3.5rem)'}}>
                <Map2 visiblePins={visiblePins} setVisiblePins={setVisiblePins} handlePinClick={handlePinClick} toggleValue={toggleValue} availableModeToggle={availableModeToggle} setMapInstance={setMapInstance}/>
            </div>

        </div>
    );
};

export default MapContainer;
