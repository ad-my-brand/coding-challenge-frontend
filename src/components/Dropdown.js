import React, { useState } from "react";
import { BiDownArrowCircle } from "react-icons/bi";

const Dropdown = ({
  data,
  selected,
  setSelected,
  currentI,
  setCurrentI,
  getIndex,
}) => {
  const [open, setOpen] = useState(false);
  const handleSelect = (item) => {
    setSelected(item.username);
    setCurrentI(item.id);
    setOpen(false);
    if (item.id) {
      getIndex(item.id);
    }
  };
  return (
    <div className="container">
      <div className="header" onClick={() => setOpen(!open)}>
        <p>{selected}</p>
        <BiDownArrowCircle className="arrow" />
      </div>
      <div className={open ? "options open" : "options"}>
        {data &&
          data.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => {
                  handleSelect(item);
                }}
                className={item.id === currentI ? "option active" : "option"}>
                {item.username}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Dropdown;
