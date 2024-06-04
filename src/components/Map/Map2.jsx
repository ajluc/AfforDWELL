import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { useNavigate } from 'react-router-dom';

const Map2 = ({ handlePinClick, map, setMap, geojson, fetchGeojson }) => {
    const mapContainer = useRef(null);

    const navigate = useNavigate()


    const handleClusters = (sourceId, sourceData, newMap, color) => {
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
            // handlePinClick(e.features[0].properties) // handlePinClick exists in MapPage.js
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
            })
            
            // Add navigation control (the +/- zoom buttons)
            newMap.addControl(new mapboxgl.NavigationControl(), 'bottom-left')

            newMap.on('load', async () => {
                setMap(newMap)
                // Fetch JSON data for Rent Stabilized Buildings and load on map
                if (geojson) {
                    handleClusters('stabilized', { type: 'FeatureCollection', features: geojson }, newMap, '#f9d74a')
                } 
            })
        }

        if (!map) {
            initializeMap()
        } else if (geojson) {
            if (!map.getSource('stabilized')) {
                handleClusters('stabilized', { type: 'FeatureCollection', features: geojson }, map, '#f9d74a')
            }
        }

    }, [map, geojson, fetchGeojson])

    return (
        <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
        );
}

export default Map2