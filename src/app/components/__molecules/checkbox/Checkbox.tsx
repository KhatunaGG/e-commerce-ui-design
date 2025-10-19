"use client";
import { CheckboxPropsType } from "@/app/interfaces/interface";
import { Check } from "../../__atoms";

const Checkbox = ({ id, checked, onChange }: CheckboxPropsType) => {
  return (
    <div className="md:w-5 md:h-5 lg:w-6 lg:h-6 relative">
      <input
        type="checkbox"
        id={id}
        className="opacity-0 absolute w-full h-full z-20 cursor-pointer"
        checked={checked}
        onChange={onChange}
      />
      <div className="md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-sm border border-[#6C7275] absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        {checked && <Check />}
      </div>
    </div>
  );
};

export default Checkbox;
