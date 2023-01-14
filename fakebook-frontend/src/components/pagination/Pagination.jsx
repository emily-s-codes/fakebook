import "./Pagination.css"
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'


const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    const nextPage = () => {
        if (currentPage !== nPages)
            setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if (currentPage !== 1)
            setCurrentPage(currentPage - 1)
    }

    return (
        <section className="paginationSection">
            <ul className="paginationUL">
                <li className="page-item-arrow">
                    <p
                        className="page-link"
                        onClick={prevPage}><BsArrowLeft size="50" /></p>
                </li>
                <section className="paginationPages">
                    {pageNumbers.map(page => {
                        return (
                            <li
                                key={page}
                                className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                <a href="#"
                                    onClick={() => setCurrentPage(page)}
                                    className='page-link'>
                                    {page}
                                </a>
                            </li>)
                    })}
                </section>
                <li className="page-item-arrow">
                    <p
                        href="#"
                        onClick={nextPage}
                        className="page-link">
                        <BsArrowRight size="50" />
                    </p>
                </li>
            </ul>
        </section>
    );
}

export default Pagination;