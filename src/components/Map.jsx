import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const Map = () => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_TOKEN;

    const initializeMap = () => {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.006, 40.7128], // New York City coordinates
        zoom: 10
      });

      newMap.on('load', async () => {
        setMap(newMap);

        // Fetch GeoJSON data
        const response = await fetch('https://data.cityofnewyork.us/resource/hg8x-zxpr.json');
        const data = await response.json();

        newMap.addSource('clusters', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: data.map(item => ({
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
          id: 'clusters',
          type: 'circle',
          source: 'clusters',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#51bbd6',
              100,
              '#f1f075',
              750,
              '#f28cb1'
            ],
            'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
          }
        });

        newMap.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'clusters',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
          }
        });

        // Add a layer for individual markers
        newMap.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: 'clusters',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': '#11b4da',
            'circle-radius': 8,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#fff'
          }
        });

        // When a cluster is clicked, zoom in to it and display individual markers
        newMap.on('click', 'clusters', (e) => {
          const features = newMap.queryRenderedFeatures(e.point, {
            layers: ['clusters']
          });
          const clusterId = features[0].properties.cluster_id;
          newMap.getSource('clusters').getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;

            newMap.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom
            });
          });
        });

        // When an individual marker is clicked, show a popup
        newMap.on('click', 'unclustered-point', (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const description = JSON.stringify(e.features[0].properties, null, 2);

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`<pre>${description}</pre>`)
            .addTo(newMap);
        });

        // Change the cursor to a pointer when hovering over clusters and individual markers
        newMap.on('mouseenter', 'clusters', () => {
          newMap.getCanvas().style.cursor = 'pointer';
        });

        newMap.on('mouseleave', 'clusters', () => {
          newMap.getCanvas().style.cursor = '';
        });

        newMap.on('mouseenter', 'unclustered-point', () => {
          newMap.getCanvas().style.cursor = 'pointer';
        });

        newMap.on('mouseleave', 'unclustered-point', () => {
          newMap.getCanvas().style.cursor = '';
        });
      });
    };

    if (!map) {
      initializeMap();
    }
  }, [map]);

  return <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />;
};

export default Map;
