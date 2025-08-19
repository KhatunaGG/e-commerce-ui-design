// import { emojis } from "@/app/commons/data";
// import React from "react";
// import { EmojiArrow } from "../../__atoms";

// const EmojiSection = () => {
//   return (
//     <div className="max-w-fit absolute top-0 right-0 z-10 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.25)] py-[10px] px-4 flex items-center justify-between rounded-[80px]">

//       {emojis.map((emoji, i) => {
//         return (
//           <button
//             key={i}
//             // onClick={() => onSelectEmoji(emoji)}
//             className="text-2xl hover:scale-110 transition-transform duration-150"
//           >
//             {emoji}
//           </button>
//         );
//       })}
//       <EmojiArrow />
//     </div>
//   );
// };

// export default EmojiSection;

import { emojis } from "@/app/commons/data";
import React from "react";
import { EmojiArrow } from "../../__atoms";
import { useReviewStore } from "@/app/store/review.store";

export type EmojiSectionProps = {
  onSelectEmoji: (emoji: string) => void;
};

const EmojiSection = ({ onSelectEmoji }: EmojiSectionProps) => {
  const { setEmojiVisible } = useReviewStore();


  return (
    <div className="max-w-fit absolute -right-10 -top-12 md:-top-16 lg:-top-14 md:-right-[120px] lg:right-0 z-20 flex flex-col items-center justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
      <div
        onMouseEnter={() => setEmojiVisible(true)}
        onMouseLeave={() => setEmojiVisible(false)}
        className="w-full flex flex-col items-center justify-center "
      >
        <div className="w-full flex items-center justify-between shadow-[0_4px_15px_rgba(0,0,0,0.25)] py-[10px] px-4  rounded-[80px] bg-white">
          {emojis.map((emoji, i) => {
            return (
              <button
              type="button"
                key={i}
                onClick={() => onSelectEmoji(emoji)}
                className="text-base md:text-lg lg:text-2xl hover:scale-110 transition-transform duration-150"
              >
                {emoji}
              </button>
            );
          })}
        </div>
        <EmojiArrow />
      </div>
    </div>
  );
};

export default EmojiSection;
