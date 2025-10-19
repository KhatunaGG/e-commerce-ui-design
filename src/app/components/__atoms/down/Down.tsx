import { ChevronDownPropsType } from "@/app/interfaces/interface";

const Down = ({ styles }: ChevronDownPropsType) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles}`}
    >
      <path
        d="M5.22705 7.5L10.227 12.5L15.227 7.5"
        stroke="#121212"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Down;
