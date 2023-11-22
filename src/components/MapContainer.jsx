import { useState } from 'react';
import Map from './Map';
import Button from 'react-bootstrap/Button';
import { ArrowLeft } from 'react-bootstrap-icons';
import Stack from 'react-bootstrap/Stack'
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

const MapContainer = ({ toggleWidth, visiblePins, setVisiblePins, handlePinClick, setCurrentPage }) => {
    const [isArrowFlipped, setIsArrowFlipped] = useState(false);

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
            <ToggleButtonGroup
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
            </Button>
            <div style={{ width: '100%', height: 'calc(100vh - 3.5rem)'}}>
                <Map visiblePins={visiblePins} setVisiblePins={setVisiblePins} handlePinClick={handlePinClick} toggleValue={toggleValue}/>
            </div>

        </div>
    );
};

export default MapContainer;
