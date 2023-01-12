import { Link } from "gatsby";
import React, { useEffect, useState } from "react";
import { InputType } from "../InputText/InputText";

const InputCheckbox = ({ setInputValue, setInputValidity }: InputType) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      setInputValidity(true);
      setInputValue("true");
    } else {
      setInputValidity(false);
      setInputValue("false");
    }
  }, [checked]);

  return (
    <div>
      <label className="text-white cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(!checked)}
          className="cursor-pointer mr-2"
        />{" "}
        By clicking here you accept the{" "}
        <a href="/privacy-policy" className="underline" target="_blank">
          Privacy policy
        </a>
        .
      </label>
    </div>
  );
};

export default InputCheckbox;
