import React, { useState } from "react";
import { InputType } from "../InputText/InputText";
import { handleInputChange } from "../../helpers/tools";

const InputEmail = ({
  nameFor,
  setInputValue,
  setInputValidity,
}: InputType) => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [err, setErr] = useState({ error: false, message: "" });

  const validateInput = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.length < 3 || regex.test(value) === false) {
      setErr({ error: true, message: "Incorrect email format." });
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
        Your email
      </label>{" "}
      <input
        type="email"
        id={nameFor}
        name={nameFor}
        onChange={(e) => handleInputChange(e, setValue, setInputValue)}
        onBlur={validateInput}
      />
      {err.error && <p className="text-red-400 text-sm">{err.message}</p>}
    </div>
  );
};

export default InputEmail;
