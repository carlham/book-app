import React from 'react'

function PaginationControls({
    currentPage,
    totalPages,
    booksPerPage,
    onPrevPage,
    onNextPage,
    onBooksPerPageChange
}) {
    return (
        <div className="pagination-info">
            <p>
                Showing page: {currentPage} of {totalPages}
            </p>

            <div className="pagination-controls">
                <select 
                value={booksPerPage}
                onChange={onBooksPerPageChange}
                >
                    <option value="5">5 per page</option>
                    <option value="10">10 per page</option>
                    <option value="20">20 per page</option>
                    <option value="50">50 per page</option>
                </select>
                <br />
                <br />

                <button
                    onClick={onPrevPage}
                    disabled={currentPage === 1}
                >
                    Previous Page
                </button>
                <button
                    onClick={onNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next Page
                </button>
            </div>
        </div>
    )
}

export default PaginationControls