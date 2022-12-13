import { ImSpinner5 } from "react-icons/im";

const Spinner = ({ spinner, classes }) => {
  if (!spinner) return <></>;

  return <ImSpinner5 className={"animate-spin mt-1 " + classes} />;
};

export default Spinner;
