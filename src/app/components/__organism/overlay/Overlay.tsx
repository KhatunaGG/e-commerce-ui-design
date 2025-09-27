import React from "react";
import { UploadImage } from "../../__atoms";

const Overlay = () => {
  return (
    <section className="fixed inset-0 bg-black/50 w-full h-full z-20">
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-[83%] md:w-[77%] lg:w-[50%]  rounded-lg bg-white p-8 shadow-2xl">
          <form className="w-full flex  flex-col  gap-10">
            <div className="flex flex-col gap-2">
              <label htmlFor="text-sm font-semibold leading-[22px] text-[#121212]">
                Blog title
              </label>
              <input
                type="text"
                name=""
                id=""
                className="border border-[#f1f1f1] px-4 py-2 outline-none"
                placeholder="Title..."
              />
            </div>

            <div className="w-full = flex  flex-col  gap-4">
              <label htmlFor="text-sm font-semibold leading-[22px] text-[#121212]">
                Article title
              </label>
              <input
                type="text"
                name=""
                id=""
                className="border border-[#f1f1f1] px-4 py-2 outline-none"
                placeholder="Your Article Title..."
              />

              <textarea
                className="w-full border border-[#f1f1f1] min-h-[100px] overflow-y-scroll outline-none px-4 py-2 resize-none"
                placeholder="Type your text..."
              ></textarea>
            </div>

            <div className="w-full flex items-start gap-4">
              <UploadImage />
              <input
                type="file"
                className="text-sm font-semibold leading-[22px] text-[#121212]"
              />
            </div>

            <button className="py-2 px-4 text-base font-semibold leading-[22px] text-[#121212] w-fit">
              Create
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Overlay;
