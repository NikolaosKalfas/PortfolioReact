import React from "react";

type SubmitType = {
  disabledBtn: boolean;
};

const InputSubmit = ({ disabledBtn }: SubmitType) => {
  return (
    <div className="min-w-200 min-h-60 py-2">
      <input
        className={`btn-secondary ${
          disabledBtn
            ? `bg-gray-300 text-gray-400 hover:bg-gray-300 hover:text-gray-400 hover:border-secondary-color`
            : `bg-white hover:bg-secondary-color hover:text-white`
        }`}
        type="submit"
        value="Submit"
        disabled={disabledBtn}
      />
    </div>
  );
};

export default InputSubmit;
