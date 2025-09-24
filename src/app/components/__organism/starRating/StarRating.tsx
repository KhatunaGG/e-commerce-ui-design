"use client";
import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export type StarRatingPropsType = {
  productId: string;
  rating: number;
  onRate?: (score: number) => Promise<boolean>;
  totalRating?: number;
  readOnly?: boolean;
  onReplyRating?: (score: number) => Promise<boolean>;
};

const StarRating = ({
  // productId,
  rating,
  onRate,
  readOnly = false,
  // totalRating = 0,
  onReplyRating,
}: StarRatingPropsType) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number>(rating);

  useEffect(() => {
    if (!readOnly) {
      setSelected(rating);
    }
  }, [rating, readOnly]);

  const handleClick = async (index: number) => {
    if (readOnly) return;
    const score = index + 1;
    const success = onReplyRating
      ? await onReplyRating(score)
      : onRate
      ? await onRate(score)
      : false;
    if (success) {
      setSelected(score);
    }
  };

  const valueToRender = readOnly
    ? rating 
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
