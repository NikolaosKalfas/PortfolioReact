import React, { useState } from "react";
import { InputType } from "../InputText/InputText";
import { handleInputChange } from "../../helpers/tools";

const InputPhone = ({
  nameFor,
  setInputValue,
  setInputValidity,
}: InputType) => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [err, setErr] = useState({ error: false, message: "" });

  const validateInput = () => {
    const regex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    if (value.length < 9 || regex.test(value) === false) {
      setErr({ error: true, message: "Incorrect phone number format." });
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
        Your phone number
      </label>{" "}
      <input
        type="tel"
        id={nameFor}
        name={nameFor}
        onChange={(e) => handleInputChange(e, setValue, setInputValue)}
        onBlur={validateInput}
      />
      {err.error && <p className="text-red-400 text-sm">{err.message}</p>}
    </div>
  );
};

export default InputPhone;
