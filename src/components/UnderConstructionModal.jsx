import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import alertImage from '../images/warning.png'

const ConstructionModal = () => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="text-center">
        <img src={alertImage} alt="Alert" style={{ width: '100px', height: '100px', margin: '10px' }} />
        <p>This site is under development. Please check back soon for full functionality!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConstructionModal;
