import React, { useEffect, useState } from "react";

type SubmitType = {
  disabledBtn: boolean;
};

const InputSubmit = ({ disabledBtn }: SubmitType) => {
  return (
    <div className="min-w-200 min-h-60 py-2">
      <input
        className={`cursor-pointer text-text-color-primary font-semibold absolute text-center ${
          disabledBtn
            ? `bg-gray-300 text-gray-400`
            : `bg-white hover:bg-secondary-color hover:text-white`
        } border-primary-color border-2  hover:duration-300; rounded p-3 transition-colors min-w-200 min-h-60`}
        type="submit"
        value="Submit"
        disabled={disabledBtn}
      />
    </div>
  );
};

export default InputSubmit;
