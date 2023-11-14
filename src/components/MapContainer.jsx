import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Map from './Map';
// import Container from 'react-bootstrap/Container';

const MapContainer = ({ toggleWidth }) => {
    return (
        <div style={{ width: '100%', position: 'relative' }}>
            <Button 
                style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}
                onClick={toggleWidth}
            >
                <i className="bi bi-arrow-left-right"></i> {/* Bootstrap icon for arrow */}
            </Button>
            <div style={{ width: '100%', height: '100vh'}}>
                <Map />
            </div>
        </div>
    );
};

export default MapContainer;
