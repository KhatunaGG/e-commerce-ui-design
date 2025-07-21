export type SubmitPropsType = {
  isSubmitting?: boolean;
};
const Submit = (
  // { isSubmitting }: SubmitPropsType
) => {
  return (
    <button
      type="submit"
      className="w-full bg-[#141718] py-[10px] flex items-center justify-center text-white text-base font-normal rounded-lg"
    >
      Sign Up
    </button>
  );
};

export default Submit;
