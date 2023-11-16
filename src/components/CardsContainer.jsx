import { useState } from "react"
import BuildingCard from "./BuildingCard"
// import Pagination from 'react-bootstrap/Pagination'
import Container from "react-bootstrap/Container";
import MyPagination from "./MyPagination";

const CardsContainer = ({ isVisible, visiblePins, handlePinClick }) => {
    // State for pagination
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 8

    // Calculate page count and current item index
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = visiblePins.slice(indexOfFirstItem, indexOfLastItem)
    const pageCount = Math.ceil(visiblePins.length / itemsPerPage)

    return (
        <div style={{ width: isVisible ? '100%' : '0%', transition: 'width 0.3s' }}>
            {isVisible && (
                <Container>
                    {currentItems.map(pin => 
                        <BuildingCard key={pin.building_id} pin={pin} handlePinClick={handlePinClick}/>
                    )}
                    <MyPagination pageCount={pageCount} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                </Container>
            )}
        </div>
    );
};

export default CardsContainer;
