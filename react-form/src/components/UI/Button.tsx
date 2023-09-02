import React from "react";

type ButtonProps = {
  title: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ title, onClick }: ButtonProps) => {
  return (
    <button
      type="submit"
      className="py-2 px-4 mt-4 text-lg bg-blue-800 text-white w-full rounded duration-75 hover:bg-blue-900"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
