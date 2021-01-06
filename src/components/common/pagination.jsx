import React from 'react';
import _ from 'lodash'; // underscore library

const Pagination = (props) => {
    const {itemsCount, pageSize, currentPage, onPageChange} = props;
    console.log(currentPage);
    //ex. if pageSize is 4 (max 4 items in each page),
    //and itemsCount was 15, there will be 4 pages with 3 items on the last page 
    //ceil() to round up, so that we don't have a double/float value for pages
    const pagesCount = Math.ceil(itemsCount / pageSize);

    //null check if we have only 1 page then don't render the page buttons
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);
    // [1...pagesCount].map()
    return <nav>
        <ul className="pagination">
            {pages.map(page =>(

            <li key={page} 
            //className becomes dynamic and switches depending on if we're on the current page
            className={page === currentPage ? 'page-item active' : 'page-item'}>
                <a className="page-link" 
                onClick={() => onPageChange(page)}>{page}</a>
            </li>
           ))}
        </ul>
    </nav>

}
 
export default Pagination;