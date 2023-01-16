import { useMemo } from "react"
// https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/

export const DOTS = "..."

const range = (start, end) => {
    let length = end - start + 1
    return Array.from({ length }, (_, idx) => idx + start)
}

export const usePagination = ({
    recordsPerPage,
    totalCount,
    nPages,
    currentPage,
    siblingCount = 1
}) => {

    const paginationRange = useMemo(() => {
        const totalPageNumbers = siblingCount + 5;

        /* don't need dots */
        if (totalPageNumbers >= nPages) {
            return range(1, nPages)
        }
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
        const rightSiblingIndex = Math.min(currentPage + siblingCount, nPages)
        const showLeftDots = leftSiblingIndex > 2
        const showRightDots = rightSiblingIndex < nPages - 2
        const firstPageIndex = 1
        const lastPageIndex = nPages

        /* show right dots only */
        if (!showLeftDots && showRightDots) {
            let leftItemCount = 3 + 2 * siblingCount
            let leftRange = range(1, leftItemCount)
            return [...leftRange, DOTS, nPages]
        }

        /* show left dots only */
        if (showLeftDots && !showRightDots) {
            let rightItemCount = 3 + 2 * siblingCount
            let rightRange = range(nPages - rightItemCount + 1, nPages)
            return [firstPageIndex, DOTS, ...rightRange]
        }

        /* show left and right dots */
        if (showLeftDots && showRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex)
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
        }

    }, [totalCount, recordsPerPage, siblingCount, currentPage])

    return paginationRange
}