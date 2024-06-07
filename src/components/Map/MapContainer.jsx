import { useState, useEffect, useRef } from 'react';
// import Map from './Map';
import Map2 from './Map2';
import { SearchBox } from '@mapbox/search-js-react';
import Client from '../../services/api';

import Button from 'react-bootstrap/Button';
import { ArrowLeft } from 'react-bootstrap-icons';
import Stack from 'react-bootstrap/Stack'
import mapboxgl from 'mapbox-gl';

const MapContainer = ({ toggleWidth, setIsFullWidth, isArrowFlipped, setIsArrowFlipped, handlePinClick, mapSearchResult, geojson, fetchGeojson, setCurrentBuilding }) => {
    const [map, setMap] = useState(null)
    const currentMarker = useRef(null)

    // Format addresses to match back end data
    const normalizeAddress = (address) => {
        // Upper case and remove 'st', 'nd', 'rd', 'th'
        address = address.toUpperCase().replace(/(\d+)(ST|ND|RD|TH)/g, '$1')
        return address
    }

    const handleSearch = async (query) => {
        if (query && map) {
            const [lon, lat] = query.features[0].geometry.coordinates
            
            map.easeTo({
                center: [lon, lat],
                zoom: 18
            })

            console.log('one search')
            console.log(currentMarker.current)
            setIsFullWidth(false)
            setIsArrowFlipped(true)
        
            const normalizedAddress = normalizeAddress(query.features[0].properties.address)
            try {
                const buildingDetails = await Client.get('/stabilized',{
                    params: {
                        address: normalizedAddress
                    }
                })

                let markerLon = lon
                let markerLat = lat

                if (buildingDetails.data.message === 'No match found') {
                    console.log("does not exist in database of stabilized buildings")
                    setCurrentBuilding(null)
                } else {
                    const { latitude, longitude } = buildingDetails.data
                    markerLon = longitude
                    markerLat = latitude
                    setCurrentBuilding(buildingDetails.data)
                }

                // Remove existing marker
                if (currentMarker.current) {
                    console.log('removed')
                    currentMarker.current.remove()
                }

                // Add marker to new search
                currentMarker.current = new mapboxgl.Marker().setLngLat([markerLon,markerLat]).addTo(map)
            } catch (error) {
                console.log("Error fetching data: ", error)
            }
        }
    }

    // When navigating to map from landing page's search bar, run handleSearch function
    useEffect(() => {
        if (mapSearchResult && map) {
            handleSearch(mapSearchResult)
        }
    }, [mapSearchResult, map])

    const handleArrowClick = () => {
        setIsArrowFlipped(!isArrowFlipped);
        toggleWidth();
    };

    return (
        <div style={{ width: '100%', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000, minWidth: '40vw'}}>
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
            </div>
            <Button 
                style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000}}
                onClick={handleArrowClick}
                >
                <Stack direction='horizontal'>
                    {isArrowFlipped ? <p style={{marginBottom: "0px", marginRight: "10px"}}>Hide</p> : <p style={{marginBottom: "0px", marginRight: "10px"}}>Details</p>}
                    <ArrowLeft style={{transform: isArrowFlipped ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.6s' }}/>
                </Stack>
            </Button>
            <div style={{ width: '100%', height: 'calc(100vh - 3.5rem)'}}>
                <Map2 handlePinClick={handlePinClick} map={map} setMap={setMap} geojson={geojson} fetchGeojson={fetchGeojson}/>
            </div>

        </div>
    );
};

export default MapContainer;
