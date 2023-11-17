import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
// import { MapboxSearchBox } from '@mapbox/search-js-web';
import dataStabilized from "../temporaryData/testData.json"

const Map = ({ setVisiblePins, handlePinClick, toggleValue }) => {
    const mapContainer = useRef(null);
    const [map, setMap] = useState(null);
    const [dataAffordable, setAffordable] = useState(null)

    // Function to add a data sourceId to the map, make clusters and individual markers, and add click/mouse functionality for the clusters and markers.
    const handleClusters = (sourceId, sourceData, newMap, color) => {
        newMap.addSource(sourceId, {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: sourceData.map(item => ({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [
                        parseFloat(item.longitude),
                        parseFloat(item.latitude)
                        ]
                    },
                    properties: item
                }))
            },
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
            handlePinClick(e.features[0].properties)
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
        console.log('in use effect', toggleValue)
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_TOKEN;

        const initializeMap = () => {
            const newMap = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-74.006, 40.7128], // New York City coordinates
                zoom: 10
            });
            
            // Add navigation control (the +/- zoom buttons)
            newMap.addControl(new mapboxgl.NavigationControl(), 'bottom-left')
            
            newMap.on('load', async () => {
                console.log('entered on load', toggleValue)
                setMap(newMap);

                // Fetch JSON data for Affordable Housing Projects
                const response = await fetch('https://data.cityofnewyork.us/resource/hg8x-zxpr.json');
                let data = await response.json();
                // Filter out the "confidential" projects that are appearing at [0,0]
                // Future question: what are these projects? Will need to look through the OpenData documentation or contact the city.
                data = data.filter(item => item.latitude);
                // On load, set state to show all cards
                setVisiblePins(data)
                setAffordable(data)

                // Fetch JSON data for Rent Stabilized Buildings (currently, temporary example data is imported)
                console.log(dataStabilized)
                handleClusters('stabilized', dataStabilized, newMap, '#f9d74a')

                
                // Add search bar
                // const searchJS = document.getElementById('search-js');
                // searchJS.onload = function () {
                //     const searchBox = new MapboxSearchBox();
                //     searchBox.accessToken = mapboxgl.accessToken;
                //     searchBox.options = {
                //         types: 'address,poi',
                //         proximity: [-73.99209, 40.68933]
                //     };
                //     searchBox.marker = true;
                //     searchBox.mapboxgl = mapboxgl;
                //     newMap.addControl(searchBox);
                // };

                // Event listener to track changes in the map's bounds/viewport
                // Used to update visible data points for which cards are displayed
                newMap.on('moveend', () => {
                    const bounds = newMap.getBounds();
                    // Filter data points using these bounds to find visible data elements
                    const visibleData = data.filter(item => bounds.contains([item.longitude, item.latitude]));
                    setVisiblePins(visibleData)
                });
            });
        };

        if (!map) {
            initializeMap();
        }

    }, [map]);

    useEffect (() => {
        if(!map) return

        // run the handle function to put data on the map for both stabilized and affordable units
        // need functionality to remove layers for each
        if (toggleValue !== 1) {
            console.log("hi", toggleValue)
            handleClusters('affordable', dataAffordable, map, '#51bbd6')
        }
        if (toggleValue !== 2) {
            console.log("hi", toggleValue)
            handleClusters('stabilized', dataStabilized, map, '#f9d74a')
        }

    }, [toggleValue])

    return (
        <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
        );
};

export default Map;
