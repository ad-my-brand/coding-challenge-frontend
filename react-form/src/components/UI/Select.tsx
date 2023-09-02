import React, { useState, useEffect } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import type { UserData } from "../../types";

type SelectProps = {
  label: string;
  data?: UserData[] | null;
  validateInput: (error: string) => string;
  onChange?: (e: React.ChangeEvent) => void;
};

const Select = ({ label, onChange, data, validateInput }: SelectProps) => {
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setErrorMsg(validateInput("Please select a user"));
  }, [validateInput]);

  return (
    <div className="flex flex-col items-start">
      <div className="flex justify-between items-center w-full">
        <label
          htmlFor={`select-${label}`}
          className="md:text-lg mb-3 mt-2 font-medium"
        >
          {label}
        </label>
        {errorMsg && (
          <span
            className="flex items-center gap-2 text-red-500 bg-red-100 px-2 py-0.5 text-sm md:text-base font-medium rounded"
            id="selectError"
          >
            <FaCircleInfo /> {errorMsg}
          </span>
        )}
      </div>

      <select
        className="py-2 px-4 rounded w-full border border-gray-400 bg-white"
        id={`select-${label}`}
        onChange={onChange}
        aria-label="Users"
        aria-describedby="selectError"
      >
        {data &&
          data.map((item) => {
            const { id, name } = item;

            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default Select;
