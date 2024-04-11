import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
const Pagination = ({ onClick, pageCount, forcePage }) => {
  return (
    <div>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={onClick}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        forcePage={forcePage - 1}
        breakLabel="..."
        previousLabel="&laquo;"
        nextLabel="&raquo;"
        containerClassName={css.paginationStyle}
        activeClassName={css.activeStyle}
        pageClassName={css.pageItem}
        disabledClassName={css.disabledPageItem}
        nextClassName={css.pageItem}
        previousClassName={css.pageItem}
      />
    </div>
  );
};

export default Pagination;
