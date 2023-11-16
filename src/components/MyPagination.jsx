import { useState } from 'react'
import Pagination from 'react-bootstrap/Pagination'


const MyPagination = ({pageCount, currentPage, setCurrentPage}) => {
    

    // Function to allow for ellipses in pagination
    const renderPaginationItems = () => {
        let items = [];
        let startPage, endPage;

        if (pageCount <= 5) {
            // Less than 5 total pages, show all
            startPage = 1;
            endPage = pageCount;
        } else {
            // More than 5 total pages, calculate start and end pages
            if (currentPage <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage + 2 >= pageCount) {
                startPage = pageCount - 4;
                endPage = pageCount;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
        }

        // First page and ellipsis
        if (startPage > 1) {
            items.push(<Pagination.Item key={1} onClick={() => setCurrentPage(1)}>1</Pagination.Item>);
            items.push(<Pagination.Ellipsis key="ellipsis1" />);
        }

        // Page numbers
        for (let number = startPage; number <= endPage; number++) {
            items.push(
                <Pagination.Item 
                    key={number} 
                    active={number === currentPage} 
                    onClick={() => setCurrentPage(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }

        // Last page and ellipsis
        if (endPage < pageCount) {
            items.push(<Pagination.Ellipsis key="ellipsis2" />);
            items.push(<Pagination.Item key={pageCount} onClick={() => setCurrentPage(pageCount)}>{pageCount}</Pagination.Item>);
        }

        return items;
    };

    return (
        <Pagination>
            <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
            {renderPaginationItems()}
            <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pageCount} />
            <Pagination.Last onClick={() => setCurrentPage(pageCount)} disabled={currentPage === pageCount} />
        </Pagination>
    )
}

export default MyPagination