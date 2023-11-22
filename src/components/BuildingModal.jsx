import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const BuildingModal = ({selectedPin, showPinDetails, setShowPinDetails}) => {
    const handleCloseModal = () => {
        setShowPinDetails(false)
    }

    const ModalType = () => {
        if (selectedPin?.project_id) {
            return (
                <Modal show={showPinDetails} onHide={handleCloseModal}>
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
            return (
                <Modal show={showPinDetails} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedPin?.address.split(',')[0]}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Existing Building in {selectedPin?.city}</Modal.Body>
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

        } else {
            return (
                <Modal show={showPinDetails} onHide={handleCloseModal}>
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