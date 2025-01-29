import React from "react";
import "../styles/pagination.css";

// const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   console.log("Total totalItems:: ", totalItems)
//   console.log("Total itemsPerPage:: ", itemsPerPage)
//   console.log("Total pages:: ", totalPages)

//   if (totalPages <= 1) return null; // No pagination needed for one page

//   const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <div className="pagination flex items-center justify-center space-x-2 my-4">
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
//       >
//         Previous
//       </button>
//       {pageNumbers.map((number) => (
//         <button
//           key={number}
//           onClick={() => onPageChange(number)}
//           className={`px-3 py-1 rounded border ${
//             number === currentPage
//               ? 'bg-blue-500 text-white'
//               : 'hover:bg-gray-100'
//           }`}
//         >
//           {number}
//         </button>
//       ))}
//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
//       >
//         Next
//       </button>
//     </div>
//   );
// };
const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  // const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const maxPageButtons = 3;
  const startPage = Math.max(currentPage - Math.floor(maxPageButtons / 2), 1);
  const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
  console.log("start page: ", startPage, " end page:: ", endPage);

  return (
    <div className="pagination-container">
      <a
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        <i class="fa fa-angle-left"></i> 
      </a>

      <div className="page-numbers">
        {/* {startPage > 1 && (
          <button className="page-number" onClick={() => onPageChange(1)}>
            1
          </button>
        )} */}
        {startPage > 2 && <span className="ellipsis">...</span>}

        {pageNumbers.map((number) => (
          <a
            key={number}
            onClick={() => onPageChange(number)}
            className={`page-number ${number === currentPage ? "active" : ""}`}
          >
            {number}
          </a>
        ))}

        {endPage < totalPages - 1 && <span className="ellipsis">...</span>}
        {/* {endPage < totalPages && (
          <button
            className="page-number"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        )} */}
      </div>

      <a
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        <i class="fa fa-angle-right"></i> 
      </a>
    </div>
  );
};

export default Pagination;
