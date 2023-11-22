import { useState } from "react"
import BuildingCard from "./BuildingCard"
// import Pagination from 'react-bootstrap/Pagination'
import Container from "react-bootstrap/Container";
import MyPagination from "./MyPagination";

const CardsContainer = ({ isVisible, visiblePins, handlePinClick, currentPage, setCurrentPage }) => {
    // State for pagination
    const itemsPerPage = 8

    // Calculate page count and current item index
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = visiblePins.slice(indexOfFirstItem, indexOfLastItem)
    const pageCount = Math.ceil(visiblePins.length / itemsPerPage)

    return (
        <div style={{ width: isVisible ? '100%' : '0%', transition: 'width 0.3s', height: 'calc(100vh - 3.5rem)', overflow: 'auto', position: 'relative' }}>
            {isVisible && (
                <Container>
                    {currentItems.map(pin => 
                        <div style={{ paddingBottom: '10px'}}>
                            <BuildingCard key={pin.building_id} pin={pin} handlePinClick={handlePinClick} />
                        </div>
                    )}
                    {(pageCount > 1) && (
                        <MyPagination pageCount={pageCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    )}
                </Container>
            )}
        </div>
    );
};

export default CardsContainer;
