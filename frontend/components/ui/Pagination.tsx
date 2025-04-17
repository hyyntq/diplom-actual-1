import { PaginationProps } from "@/lib/interface";
import React from "react";


const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex justify-center gap-3">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-stone-800 text-gray-200 rounded disabled:opacity-80 cursor-pointer"
      >
        Prev
      </button>

      <div className="flex gap-2">
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 border border-stone-800  transition duration-300 ${
                currentPage === page
                  ? "bg-stone-800 text-gray-200 cursor-default"
                  : "bg-gray-200 text-stone-800 hover:bg-stone-800 hover:text-gray-200 cursor-pointer"
              } rounded-xl`}
            >
              {page}
            </button>
          );
        })}

      </div>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-stone-800 text-gray-200 rounded disabled:opacity-80 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
