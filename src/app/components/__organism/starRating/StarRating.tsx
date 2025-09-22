// "use client";

// import React, { useEffect, useState } from "react";
// import { FaRegStar, FaStar } from "react-icons/fa";

// export type StarRatingPropsType = {
//   productId: string;
//   rating: number;
//   onRate?: (score: number) => Promise<boolean>;
//   totalRating?: number;
//     readOnly?: boolean; 
// };

// const StarRating = ({ productId, rating, onRate, readOnly = false }: StarRatingPropsType) => {
//   const [hovered, setHovered] = useState<number | null>(null);
//   const [selected, setSelected] = useState<number>(rating);

//   useEffect(() => {
//     setSelected(rating);
//   }, [rating]);

//   // const handleClick = (index: number) => {
//   //   const score = index + 1;
//   //   setSelected(score);
//   //   onRate?.(score);
//   // };

//   const handleClick = async (index: number) => {
//     if (readOnly || !onRate) return;

//     const score = index + 1;
//     const success = await onRate(score);
//     if (success) {
//       setSelected(score);
//     }
//   };

//   return (
//     <div className="flex items-center">
//       {Array.from({ length: 5 }, (_, i) => (
//         <span
//          className={readOnly ? "cursor-default" : "cursor-pointer"}
//           onClick={() => handleClick(i)}
//           onMouseEnter={() => setHovered(i)}
//           onMouseLeave={() => setHovered(null)}

//           key={i}
//         >
//           {hovered !== null ? (
//             i <= hovered ? (
//               <FaStar className="text-yellow-500" />
//             ) : (
//               <FaRegStar className="text-gray-400" />
//             )
//           ) : i < selected ? (
//             <FaStar className="text-yellow-500" />
//           ) : (
//             <FaRegStar className="text-gray-400" />
//           )}
//         </span>
//       ))}
//     </div>
//   );
// };

// export default StarRating;




// "use client";

// import React, { useEffect, useState } from "react";
// import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

// export type StarRatingPropsType = {
//   productId: string;
//   rating: number;
//   onRate?: (score: number) => Promise<boolean>;
//   totalRating?: number;
//     readOnly?: boolean; 
// };

// const StarRating = ({ productId, rating, onRate, readOnly = false, totalRating }: StarRatingPropsType) => {
//   const [hovered, setHovered] = useState<number | null>(null);
//   const [selected, setSelected] = useState<number>(rating);
//   console.log(totalRating, "totalRating")

//   useEffect(() => {
//     setSelected(rating);
//   }, [rating]);

//   // const handleClick = (index: number) => {
//   //   const score = index + 1;
//   //   setSelected(score);
//   //   onRate?.(score);
//   // };

//   const handleClick = async (index: number) => {
//     if (readOnly || !onRate) return;

//     const score = index + 1;
//     const success = await onRate(score);
//     if (success) {
//       setSelected(score);
//     }
//   };

//   const renderStar = (index: number) => {
//     if (readOnly && typeof totalRating === "number") {
//       const starNumber = index + 1;
//       if (totalRating >= starNumber) {
//         // Full star
//         return <FaStar className="text-yellow-500" />;
//       } else if (totalRating >= starNumber - 0.5) {
//         // Half star
//         return <FaStarHalfAlt className="text-yellow-500" />;
//       } else {
//         // Empty star
//         return <FaRegStar className="text-gray-400" />;
//       }
//     }

//     // If not readOnly, fallback to hover/selected state for stars
//     if (hovered !== null) {
//       return hovered >= index ? (
//         <FaStar className="text-yellow-500" />
//       ) : (
//         <FaRegStar className="text-gray-400" />
//       );
//     }

//     return selected > index ? (
//       <FaStar className="text-yellow-500" />
//     ) : (
//       <FaRegStar className="text-gray-400" />
//     );
//   };

//   return (
//     <div className="flex items-center">
//       {Array.from({ length: 5 }, (_, i) => (
//         <span
//          className={readOnly ? "cursor-default" : "cursor-pointer"}
//           onClick={() => handleClick(i)}
//           onMouseEnter={() => setHovered(i)}
//           onMouseLeave={() => setHovered(null)}

//           key={i}
//         >
//           {renderStar(i)}
//         </span>
//       ))}
//     </div>
//   );
// };

// export default StarRating;









"use client";

import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export type StarRatingPropsType = {
  productId: string;
  rating: number;
  onRate?: (score: number) => Promise<boolean>;
  totalRating?: number; 
  readOnly?: boolean;



  //  onReplyRating?: (score: number, replyId: string) => Promise<boolean>
    onReplyRating?: (score: number) => Promise<boolean>;
};

const StarRating = ({
  // productId,
  rating,
  onRate,
  readOnly = false,
  totalRating = 0,

  onReplyRating
}: StarRatingPropsType) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number>(rating);

  useEffect(() => {
    setSelected(rating);
  }, [rating]);

  // const handleClick = async (index: number) => {
  //   if (readOnly || !onRate) return;

  //   const score = index + 1;
  //   const success = await onRate(score);
  //   if (success) {
  //     setSelected(score);
  //   }
  // };


    const handleClick = async (index: number) => {
    if (readOnly) return;

    const score = index + 1;

    // Prefer reply rating if it's provided, otherwise use regular rating
    const success = onReplyRating
      ? await onReplyRating(score)
      : onRate
      ? await onRate(score)
      : false;

    if (success) {
      setSelected(score);
    }
  };

  // const valueToRender = readOnly 
  //   ? totalRating 
  //   : (hovered !== null ? hovered + 1 : selected);

   const valueToRender = readOnly
    ? totalRating
    : hovered !== null
    ? hovered + 1
    : selected;

  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }, (_, i) => {
        let icon;
        if (valueToRender >= i + 1) {
          icon = <FaStar className="text-yellow-500" />;
        } else if (valueToRender >= i + 0.5) {
          icon = <FaStarHalfAlt className="text-yellow-500" />;
        } else {
          icon = <FaRegStar className="text-gray-400" />;
        }

        return (
          <span
            key={i}
            className={readOnly ? "cursor-default" : "cursor-pointer"}
            onClick={() => handleClick(i)}
            onMouseEnter={() => !readOnly && setHovered(i)}
            onMouseLeave={() => !readOnly && setHovered(null)}
          >
            {icon}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;