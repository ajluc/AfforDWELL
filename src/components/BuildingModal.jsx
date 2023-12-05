import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

const BuildingModal = ({selectedPin, showPinDetails, setShowPinDetails}) => {
    const handleCloseModal = () => {
        setShowPinDetails(false)
    }

    // Calculate days remaining for lottery closing
    function daysUntil(isoDate) {
        const currentDate = new Date();
        const targetDate = new Date(isoDate);
    
        const differenceInTime = targetDate.getTime() - currentDate.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    
        return differenceInDays;
    }
    // Format dates for lottery end dates
    function formatIsoDate(isoDate) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = months[date.getMonth()];
        const day = date.getDate();
    
        return `${month} ${day}, ${year}`;
    }
    

    const ModalType = () => {
        if (selectedPin?.project_id) {
            // Modal for Affordable Housing data from the city
            return (
                <Modal centered show={showPinDetails} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedPin?.project_name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{selectedPin?.reporting_construction_type} in {selectedPin?.borough}</Modal.Body>
                    <Modal.Body>{selectedPin?.total_units} affordable units</Modal.Body>
                    <Modal.Footer>
                        <Modal.Body>(x{selectedPin?.studio_units}) studio units</Modal.Body>
                        <Modal.Body>(x{selectedPin?._1_br_units}) 1 bedroom units</Modal.Body>
                        <Modal.Body>(x{selectedPin?._2_br_units}) 2 bedroom units</Modal.Body>
                        <Modal.Body>(x{selectedPin?._3_br_units}) 3 bedroom units</Modal.Body>
                        <Modal.Body>(x{selectedPin?._4_br_units}) 4 bedroom units</Modal.Body>
                        <Modal.Body>(x{selectedPin?._5_br_units}) 5 bedroom units</Modal.Body>
                        <Modal.Body>(x{selectedPin?._6_br_units}) 6 bedroom units</Modal.Body>
                    </Modal.Footer>
                </Modal>
            )
        } else if (selectedPin?.bldgno1) {
            // Modal for Rent Stabilized Building data from the city
            return (
                <Modal centered show={showPinDetails} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedPin?.address.split(',')[0]}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Residential Building in {selectedPin?.city}</Modal.Body>
                    <Modal.Body>(#) affordable units</Modal.Body>
                    <Modal.Footer>
                        <Button>Leave Feedback</Button>
                        <Button>Verify Stabilized Unit</Button>
                    </Modal.Footer>
                </Modal>
            )
        } else if (selectedPin?.type === "stabilized listing") {
            let images = JSON.parse(selectedPin.images)
            let posting = JSON.parse(selectedPin.posting)
            // Modal for Rent Stabilized unit listing data
            return (
                <Modal centered show={showPinDetails} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedPin?.address} {selectedPin?.unit}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>${selectedPin?.price}</h4>
                        <p>Residential Building in {selectedPin?.city}</p>
                        <p>{selectedPin?.beds} bed(s)</p>
                        <p>{selectedPin?.baths} bath(s)</p>
                        <Carousel interval={null} data-bs-theme="dark">
                            {images.map(img =>
                                <Carousel.Item key={img} style={{ position: 'relative', height: '500px' }}>
                                <Image style={{ 
                                    position: 'absolute', 
                                    // top: '50%', 
                                    left: '50%', 
                                    transform: 'translate(-50%, 0%)',
                                    maxHeight: '100%',
                                    // maxWidth: '100%'
                                }} src={img}/>
                                </Carousel.Item>
                            )}
                        </Carousel>
                    </Modal.Body>
                    <Modal.Footer>
                    <p>This listing was found on {posting.platform}</p>
                        <Button href={posting.link} target='_blank'>Go To Listing</Button>
                    </Modal.Footer>
                </Modal>
            )
        } else if (selectedPin?.type === "affordable lottery") {
            let images = JSON.parse(selectedPin.images)
            let posting = JSON.parse(selectedPin.posting)
            let units = JSON.parse(selectedPin.units)
            // Modal for Rent Stabilized unit listing data

            let daysTilClose = daysUntil(selectedPin?.endDate)
            let dateOfClose = formatIsoDate(selectedPin?.endDate)
            console.log(selectedPin)
            return (
                <Modal centered show={showPinDetails} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedPin?.address} {selectedPin?.unit}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Lottery closes in {daysTilClose} days - {dateOfClose}</h5>
                        <p>New Construction in {selectedPin?.city}</p>
                        <p>Eligible Income: ${selectedPin?.minIncome} - ${selectedPin?.maxIncome}</p>
                        {units.map(unit =>
                            <p>{unit.beds} beds at ${unit.price} (x{unit.quantity})</p>
                            )}
                        <Carousel interval={null} data-bs-theme="dark">
                            {images.map(img =>
                                <Carousel.Item key={img} style={{ position: 'relative', height: '500px' }}>
                                    <Image style={{ 
                                        position: 'absolute', 
                                        top: '50%', 
                                        left: '50%', 
                                        transform: 'translate(-50%, -50%)',
                                        maxHeight: '100%',
                                        maxWidth: '100%'
                                    }} src={img}/>
                                </Carousel.Item>
                            )}
                        </Carousel>
                    </Modal.Body>
                    <Modal.Footer>
                    <p>This listing was found on {posting.platform}</p>
                        <Button href={posting.link} target='_blank'>Go To Listing</Button>
                    </Modal.Footer>
                </Modal>
            )
        } else {
            return (
                <Modal centered show={showPinDetails} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Error</Modal.Body>
                </Modal>
            )
        }
    }
    return (
        <ModalType />
    );
}

export default BuildingModal;