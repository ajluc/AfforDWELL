import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

const SearchModal = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Body className="text-center">
                <p>Search coming soon</p>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
            </Modal.Body>

        </Modal>
    )
}

export default SearchModal
