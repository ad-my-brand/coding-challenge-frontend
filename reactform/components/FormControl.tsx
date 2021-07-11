import { FC } from "react";
import styles from "../styles/Home.module.css";

type validationFunction = (message: string) => void;

interface Props {
  formLabel: string;
  validate: validationFunction;
  error: string;
}

const FormControl: FC<Props> = (props) => {
  const { formLabel, error, children } = props;

  return (
    <div>
      <div className={styles.label}>
        <label>{formLabel}</label>
      </div>

      <div className={styles.validationError}>{error}</div>
      <div>{children}</div>
    </div>
  );
};

export default FormControl;
