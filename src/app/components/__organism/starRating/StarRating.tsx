import { useShopStore } from "@/app/store/shop-page.store";
import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export type StarRatingPropsType = {
  _id: string;
  rate: number;
};

const StarRating = ({ _id, rate }: StarRatingPropsType) => {
  const { rating } = useShopStore();
  console.log(_id, rate);

  const getStarIcon = (index: number) => {
    if (rating >= index + 1) return <FaStar className="text-gray-400" />;
    if (rating >= index + 0.5)
      return <FaStarHalfAlt className="text-gray-400" />;
    return <FaRegStar className="text-gray-400" />;
  };

  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{getStarIcon(i)}</span>
      ))}
    </div>
  );
};

export default StarRating;
