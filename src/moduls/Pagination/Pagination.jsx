import React from "react";

const Pagination = ({ countriesPerPage, totalCountries, onPageChange, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
        pageNumbers.push(i);
    }

    const scrollToTop = () => {
        window.scrollTo({
            top:0,
             behavior: 'smooth'
        })
    }

    return (
        <div>
            <ul className="pagination">
                {
                    pageNumbers.map((number) => (
                        <li className="page-item" key={number}>
                            <button onClick={() => {onPageChange(number); scrollToTop();} } className={`page-link ${currentPage === number ? 'active' : ''}`}
                            >
                                {number}
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Pagination;