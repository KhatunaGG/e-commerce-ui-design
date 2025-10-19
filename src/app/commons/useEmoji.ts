import { RefObject } from "react";
import { UseFormSetValue, FieldValues, Path } from "react-hook-form";

export const useEmojiInsert = <T extends FieldValues>(
  textAreaRef: RefObject<HTMLTextAreaElement | null>,
  setValue: UseFormSetValue<T>,
  fieldName: Path<T>
) => {
  const insertEmoji = (emoji: string) => {
    const textarea = textAreaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentValue = textarea.value;

    const newValue = currentValue.substring(0, start) + emoji + currentValue.substring(end);

    setValue(fieldName, newValue as T[typeof fieldName], { shouldValidate: true });

    textarea.value = newValue;
    textarea.focus();
    setTimeout(() => {
      textarea.setSelectionRange(start + emoji.length, start + emoji.length);
    }, 0);
  };

  return insertEmoji;
};
