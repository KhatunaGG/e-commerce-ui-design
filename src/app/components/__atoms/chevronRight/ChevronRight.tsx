export type ChevronRightPropsType = {
  width?: string;
  height?: string;
};

const ChevronRight = ({
  width = "12px",
  height = "12px",
}: ChevronRightPropsType) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.58423 3L7.58423 6L4.58423 9"
        stroke="#605F5F"
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronRight;
