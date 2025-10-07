export type ChevronLeftType = {
  dark?: boolean;
};

const ChevronLeft = ({ dark = false }: ChevronLeftType) => {
  return (
    <svg
      width="12"
      height="13"
      viewBox="0 0 12 13"
      fill={dark ? "#121212" : "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.41577 9.5L4.41577 6.5L7.41577 3.5"
        stroke="#605F5F"
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronLeft;
