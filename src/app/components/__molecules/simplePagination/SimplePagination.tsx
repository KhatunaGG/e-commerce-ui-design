import React from "react";
import { ChevronLeft, ChevronRight } from "../../__atoms";

export type SimplePaginationPromsType = {
  handlePrevPage: () => void;
  handleNextPage: () => void;
  page: number;
  totalPages: number;
};

const SimplePagination = ({
  handlePrevPage,
  handleNextPage,
  page,
  totalPages,
}: SimplePaginationPromsType) => {
  return (
    <div className="w-full flex justify-between mt-4 px-4">
      <button
        onClick={handlePrevPage}
        disabled={page === 1}
        className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
      >
       <ChevronLeft />
      </button>
      <span className="text-sm">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={page === totalPages}
        className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
      >
       <ChevronRight />
      </button>
    </div>
  );
};

export default SimplePagination;
