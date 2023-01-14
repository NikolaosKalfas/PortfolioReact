type handleInputChangeType = (
  e: any,
  setValue: (arg: string) => void,
  setInputValue: (arg: string) => void
) => void;

export const handleInputChange: handleInputChangeType = (
  e,
  setValue,
  setInputValue
) => {
  setValue(e.target.value);
  setInputValue(e.target.value);
};
