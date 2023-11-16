import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Map from './Map';
import { ArrowLeft } from 'react-bootstrap-icons';
import Stack from 'react-bootstrap/Stack'

const MapContainer = ({ toggleWidth, visiblePins, setVisiblePins, handlePinClick }) => {
    const [isArrowFlipped, setIsArrowFlipped] = useState(false);

    const handleArrowClick = () => {
        setIsArrowFlipped(!isArrowFlipped);
        toggleWidth();
    };

    return (
        <div style={{ width: '100%', position: 'relative' }}>
            <Button 
                style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000}}
                onClick={handleArrowClick}
                >
                <Stack direction='horizontal'>
                    {isArrowFlipped ? <p style={{marginBottom: "0px", marginRight: "10px"}}>Hide List</p> : <p style={{marginBottom: "0px", marginRight: "10px"}}>Show List</p>}
                    <ArrowLeft style={{transform: isArrowFlipped ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.6s' }}/>
                </Stack>
            </Button>
            <div style={{ width: '100%', height: '100vh'}}>
                <Map visiblePins={visiblePins} setVisiblePins={setVisiblePins} handlePinClick={handlePinClick} />
            </div>

        </div>
    );
};

export default MapContainer;
