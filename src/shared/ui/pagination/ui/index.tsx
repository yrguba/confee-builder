import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './styles.module.scss';
import { PaginationProps } from '../types';

function Pagination(props: PaginationProps) {
    const { pageCount, pageClick } = props;

    return (
        <ReactPaginate
            className={styles.wrapper}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(data) => pageClick(data.selected)}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            pageClassName={styles.item}
            pageLinkClassName={styles.link}
            previousClassName={styles.arrows}
            previousLinkClassName="page-link"
            nextClassName={styles.arrows}
            nextLinkClassName="page-link"
            breakClassName={styles.item}
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName={styles.active}
            // renderOnZeroPageCount={null}
        />
    );
}

export default Pagination;
