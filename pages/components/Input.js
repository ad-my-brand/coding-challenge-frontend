// import { useForm ,useFormContext} from "react-hook-form";

import { useState } from "react";

const Input = ({ label, valF, reg, message }) => {
  const [temp, setTemp] = useState("jn");

  return (
    <div className="form-control w-50">
      <label>
        {label}:<br />
        <input
          class="form-group w-100 center"
          name={label}
          {...reg(label, {
            validate: {
              positive: (k) => valF(k) || message,
            },
          })}
        ></input>
      </label>
    </div>
  );
};

export default Input;
