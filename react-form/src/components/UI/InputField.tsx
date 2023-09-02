import React, { useEffect, useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";

type InputFieldProps = {
  label: string;
  type: string;
  value: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  validateInput: (error: string) => string;
  onChange: (e: React.ChangeEvent) => void;
};

const InputField = ({
  label,
  onChange,
  type,
  value,
  validateInput,
  inputRef,
}: InputFieldProps) => {
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setErrorMsg(validateInput("required"));
  }, [validateInput]);

  useEffect(() => {
    if (inputRef && inputRef?.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <div className="flex flex-col items-start">
      <div className="flex justify-between items-center w-full">
        <label
          htmlFor={`${type}-${label}`}
          className="md:text-lg mb-3 mt-2 font-medium"
        >
          {label}
        </label>
        {errorMsg && (
          <span
            className="flex items-center gap-2 text-red-500 bg-red-100 px-2 py-0.5 text-sm md:text-base font-medium rounded"
            id="inputErrror"
          >
            <FaCircleInfo />
            {errorMsg}
          </span>
        )}
      </div>

      <input
        type={type}
        className="py-2 px-4 mb-4 rounded w-full border border-gray-400 bg-white"
        id={`${type}-${label}`}
        value={value}
        onChange={onChange}
        ref={inputRef}
        required
        aria-required="true"
        aria-invalid={!!errorMsg}
        aria-describedby="inputError"
      />
    </div>
  );
};

export default InputField;
