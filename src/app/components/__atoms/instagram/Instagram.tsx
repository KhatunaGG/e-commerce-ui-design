import React from "react";

const Instagram = ({ color }: { color?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="4"
        // stroke="#FEFEFE"
        stroke={color ? color : "#FEFEFE"}
        strokeWidth="1.5"
      />
      <circle
        cx="18"
        cy="6"
        r="1"
        // fill="#FEFEFE"
        fill={color ? color : "#FEFEFE"}
      />
      <circle
        cx="12"
        cy="12"
        r="5"
        //  stroke="#FEFEFE"
        stroke={color ? color : "#FEFEFE"}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default Instagram;
