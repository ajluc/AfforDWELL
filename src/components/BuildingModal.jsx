import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

const BuildingModal = ({selectedPin, showPinDetails, setShowPinDetails}) => {
    const handleCloseModal = () => {
        setShowPinDetails(false)
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
                        <Modal.Body>(x?) studio units</Modal.Body>
                        <Modal.Body>(x?) 1 bedroom units</Modal.Body>
                        <Modal.Body>(x?) 2 bedroom units</Modal.Body>
                        <Modal.Body>(x?) 3 bedroom units</Modal.Body>
                        <Modal.Body>(x?) 4 bedroom units</Modal.Body>
                        <Modal.Body>(x?) 5 bedroom units</Modal.Body>
                        <Modal.Body>(x?) 6 bedroom units</Modal.Body>
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
                        <p>{selectedPin?.beds} bed(s)</p>
                        <p>{selectedPin?.baths} bath(s)</p>
                        <p>Residential Building in {selectedPin?.city}</p>
                        <Carousel interval={null}>
                            {images.map(img =>
                                <Carousel.Item key={img}>
                                    <Image src={img}/>
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
            return (
                <Modal centered show={showPinDetails} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedPin?.address} {selectedPin?.unit}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>New Construction in {selectedPin?.city}</p>
                        {units.map(unit =>
                            <p>{unit.beds} beds at ${unit.price} (x{unit.quantity})</p>
                            )}
                        <Carousel interval={null}>
                            {images.map(img =>
                                <Carousel.Item key={img}>
                                    <Image src={img}/>
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