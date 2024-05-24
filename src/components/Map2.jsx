import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useNavigate } from 'react-router-dom';
import Client from '../services/api';

const Map2 = ({ setVisiblePins, handlePinClick, toggleValue, availableModeToggle }) => {
    const mapContainer = useRef(null);
    const [map, setMap] = useState(null);
    const [dataAffordable, setAffordable] = useState(null)
    const [dataStabilized, setStabilized] = useState(null)
    const [visibleAffordable, setVisibleAffordable] = useState([])
    const [visibleStabilized, setVisibleStabilized] = useState([])
    const [visibleCombined, setVisibleCombined] = useState([])

    const navigate = useNavigate()


    const handleClusters = (sourceId, sourceData, newMap, color) => {
        console.log('ping')
        newMap.addSource(sourceId, {
            type: 'geojson',
            data: sourceData,
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 50
        });

        newMap.addLayer({
            id: sourceId,
            type: 'circle',
            source: sourceId,
            filter: ['has', 'point_count'],
            paint: {
                'circle-color': [
                    'step',
                    ['get', 'point_count'],
                    color,
                    20,
                    color,
                    50,
                    color
                ],
                'circle-radius': ['step', ['get', 'point_count'], 20, 20, 30, 50, 40]
            }
        });

        newMap.addLayer({
            id: `${sourceId}-cluster-count`,
            type: 'symbol',
            source: sourceId,
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12
            }
        });

        // Add a layer for individual markers
        newMap.addLayer({
            id: `${sourceId}-unclustered-point`,
            type: 'circle',
            source: sourceId,
            filter: ['!', ['has', 'point_count']],
            paint: {
                'circle-color': color,
                'circle-radius': 8,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#fff'
            }
        });

        // When a cluster is clicked, zoom in to it and display individual markers
        newMap.on('click', sourceId, (e) => {
            const features = newMap.queryRenderedFeatures(e.point, {
                layers: [sourceId]
            });
            const clusterId = features[0].properties.cluster_id;
            newMap.getSource(sourceId).getClusterExpansionZoom(clusterId, (err, zoom) => {
                if (err) return;

                newMap.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            });
        });

        // When an individual marker is clicked, open building details modal
        newMap.on('click', `${sourceId}-unclustered-point`, (e) => {
            // handlePinClick(e.features[0].properties)
            console.log(e.features[0].properties)
            navigate(`/details/${e.features[0].properties.bbl}`)
        });

        // Change the cursor to a pointer when hovering over clusters and individual markers
        newMap.on('mouseenter', sourceId, () => {
            newMap.getCanvas().style.cursor = 'pointer';
        });

        newMap.on('mouseleave', sourceId, () => {
            newMap.getCanvas().style.cursor = '';
        });

        newMap.on('mouseenter', `${sourceId}-unclustered-point`, () => {
            newMap.getCanvas().style.cursor = 'pointer';
        });

        newMap.on('mouseleave', `${sourceId}-unclustered-point`, () => {
            newMap.getCanvas().style.cursor = '';
        });
    }

    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_TOKEN;

        const initializeMap = () => {
            const newMap = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/ajluc/clpekjkig006y01pggisrfnjl',
                center: [-74.006, 40.7128], // New York City coordinates
                zoom: 10
            });
            
            // Add navigation control (the +/- zoom buttons)
            newMap.addControl(new mapboxgl.NavigationControl(), 'bottom-left')

            newMap.on('load', async () => {
                setMap(newMap);
                // Initial map and card state:
                // Fetch JSON data for Rent Stabilized Buildings and load on map
                const stabilized_response = await Client.get('/geojson')
                let stabilized_data = stabilized_response.data
                setStabilized(stabilized_data.features)
                handleClusters('stabilized', stabilized_data, newMap, '#f9d74a')
                // On load, set state to show all stabilized building cards
                setVisibleStabilized(dataStabilized)
                setVisiblePins(visibleStabilized)
            });
        };

        if (!map) {
            initializeMap();
        }

    }, [map]);


    useEffect (() => {
        if(!map) return

        // Function to remove a layer and its source
        const removeLayerAndSource = (map, layerId) => {
            if (map.getLayer(layerId)) {
                // If the layer exists, remove it
                map.removeLayer(layerId);
            }
        
            if (map.getSource(layerId)) {
                // If the source exists, remove it
                map.removeSource(layerId);
            }
        }
    }, [toggleValue, visibleAffordable, visibleStabilized, availableModeToggle])

    return (
        <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
        );
}

export default Map2