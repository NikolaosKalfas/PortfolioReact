import React, { useState } from "react";
import { handleInputChange } from "../../helpers/tools";

export type InputType = {
  nameFor: string;
  setInputValue: (arg: string) => void;
  setInputValidity: (arg: boolean) => void;
};

const InputText = ({ nameFor, setInputValue, setInputValidity }: InputType) => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [err, setErr] = useState({ error: false, message: "" });

  const validateInput = () => {
    if (value.length < 3) {
      setErr({ error: true, message: "Please enter at least 3 characters." });
      setIsValid(false);
      setInputValidity(false);
    } else {
      setErr({ error: false, message: "" });
      setIsValid(true);
      setInputValidity(true);
    }
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={nameFor} className="text-white">
        Your name
      </label>{" "}
      <input
        type="text"
        id={nameFor}
        name={nameFor}
        onChange={(e) => handleInputChange(e, setValue, setInputValue)}
        onBlur={validateInput}
      />
      {err.error && <p className="text-red-400 text-sm">{err.message}</p>}
    </div>
  );
};

export default InputText;
