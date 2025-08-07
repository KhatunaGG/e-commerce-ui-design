// "use client";
// import { useAddressStore } from "@/app/store/address.store";

// const Pagination = () => {
//   const { page, take, ordersTotalCount, setPage, purchasesData} = useAddressStore();

//   const totalPages = Math.ceil(ordersTotalCount / take);
//   if (totalPages <= 1) return null;

//   const handleClick = (pageNum: number) => {
//     if (pageNum !== page) {
//       setPage(pageNum);
//     }
//   };

//   const renderPageNumbers = () => {
//     if (totalPages <= 3) {
//       return Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
//         <div
//           key={num}
//           onClick={() => handleClick(num)}
//           className={`w-8 h-8 rounded-lg flex items-center justify-center border border-[#d6dade] cursor-pointer ${
//             num === page ? "bg-black text-white" : ""
//           }`}
//         >
//           <p>{num}</p>
//         </div>
//       ));
//     }

//     const numbers = [];

//     // Always show 1
//     numbers.push(
//       <div
//         key={1}
//         onClick={() => handleClick(1)}
//         className={`w-8 h-8 rounded-lg flex items-center justify-center border border-[#d6dade] cursor-pointer ${
//           page === 1 ? "bg-black text-white" : ""
//         }`}
//       >
//         <p>1</p>
//       </div>
//     );

//     // Show 2 if current page is still small
//     if (page <= 2) {
//       numbers.push(
//         <div
//           key={2}
//           onClick={() => handleClick(2)}
//           className={`w-8 h-8 rounded-lg flex items-center justify-center border border-[#d6dade] cursor-pointer ${
//             page === 2 ? "bg-black text-white" : ""
//           }`}
//         >
//           <p>2</p>
//         </div>
//       );
//     } else {
//       // Show ...
//       numbers.push(
//         <div key="dots" className="w-8 h-8 flex items-center justify-center">
//           <p>...</p>
//         </div>
//       );
//     }

//     // Always show current page if it's greater than 2
//     if (page > 2) {
//       numbers.push(
//         <div
//           key={page}
//           onClick={() => handleClick(page)}
//           className={`w-8 h-8 rounded-lg flex items-center justify-center border border-[#d6dade] cursor-pointer bg-black text-white`}
//         >
//           <p>{page}</p>
//         </div>
//       );
//     }

//     return numbers;
//   };

//   return (
//     <>
//       {Array.isArray(purchasesData) && purchasesData.length > 0 && (
//         <div className="w-full flex items-center justify-center gap-2 mt-6">
//           {renderPageNumbers()}
//         </div>
//       )}
//     </>
//   );
// };

// export default Pagination;

//after perisit purchaseData
"use client";
import { useAddressStore } from "@/app/store/address.store";

const Pagination = () => {
  // const { page, take, ordersTotalCount, setPage, purchasesData} = useAddressStore();
  const { page, take, ordersTotalCount, setPage, purchasesDataByPage } =
    useAddressStore();
  const dataForCurrentPage = purchasesDataByPage[page];

  const totalPages = Math.ceil(ordersTotalCount / take);
  if (totalPages <= 1) return null;

  const handleClick = (pageNum: number) => {
    if (pageNum !== page) {
      setPage(pageNum);
    }
  };

  const renderPageNumbers = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
        <div
          key={num}
          onClick={() => handleClick(num)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center border border-[#d6dade] cursor-pointer ${
            num === page ? "bg-black text-white" : ""
          }`}
        >
          <p>{num}</p>
        </div>
      ));
    }

    const numbers = [];

    // Always show 1
    numbers.push(
      <div
        key={1}
        onClick={() => handleClick(1)}
        className={`w-8 h-8 rounded-lg flex items-center justify-center border border-[#d6dade] cursor-pointer ${
          page === 1 ? "bg-black text-white" : ""
        }`}
      >
        <p>1</p>
      </div>
    );

    // Show 2 if current page is still small
    if (page <= 2) {
      numbers.push(
        <div
          key={2}
          onClick={() => handleClick(2)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center border border-[#d6dade] cursor-pointer ${
            page === 2 ? "bg-black text-white" : ""
          }`}
        >
          <p>2</p>
        </div>
      );
    } else {
      // Show ...
      numbers.push(
        <div key="dots" className="w-8 h-8 flex items-center justify-center">
          <p>...</p>
        </div>
      );
    }

    // Always show current page if it's greater than 2
    if (page > 2) {
      numbers.push(
        <div
          key={page}
          onClick={() => handleClick(page)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center border border-[#d6dade] cursor-pointer bg-black text-white`}
        >
          <p>{page}</p>
        </div>
      );
    }

    return numbers;
  };

  return (
    <>
      {Array.isArray(dataForCurrentPage) && dataForCurrentPage.length > 0 && (
        <div className="w-full flex items-center justify-center gap-2 mt-6">
          {renderPageNumbers()}
        </div>
      )}
    </>
  );
};

export default Pagination;
