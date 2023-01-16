import "./Pagination.css"
import classNames from "classnames";
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { usePagination, DOTS } from './usePagination';

const Pagination = ({
    recordsPerPage,
    totalCount,
    nPages,
    currentPage,
    siblingCount = 1,
    setCurrentPage
}) => {

    const paginationRange = usePagination({
        recordsPerPage,
        totalCount,
        nPages,
        currentPage,
        siblingCount
    })

    if (paginationRange === undefined) {
        console.log('please wait')
        return;
    }
    else {
        console.log(paginationRange)
    }

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const nextPage = () => {
        if (currentPage !== nPages)
            setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if (currentPage !== 1)
            setCurrentPage(currentPage - 1)
    }

    let lastPage = paginationRange[paginationRange.length - 1]

    return (
        <section className="paginationSection">
            <ul className={classNames("paginationUL", {
                disabled: currentPage === 1
            })}
                onClick={prevPage}>
                <li className="page-item-arrow"
                >
                    <p className="page-link"><BsArrowLeft size="50" /></p>
                </li>
                <section className="paginationPages">
                    {paginationRange.map(pageNumber => {
                        if (pageNumber === DOTS) {
                            return <li className="page-item dots">&#8230;</li>
                        }
                        return (
                            <li
                                key={pageNumber}
                                onClick={() => setCurrentPage(pageNumber)}
                                className={classNames('page-item', {
                                    // selected: pageNumber === currentPage
                                    activePage: pageNumber === currentPage
                                })}>
                                <a href="#"
                                    className='page-link'>
                                    {pageNumber}
                                </a>
                            </li>)
                    })}
                </section>
                <li className={classNames("page-item-arrow", {
                    disabled: currentPage === lastPage
                })} >
                    <p
                        onClick={nextPage}
                        className="page-link">
                        <BsArrowRight size="50" />
                    </p>
                </li>
            </ul>
        </section >
    );
}

export default Pagination;