import { Hearts } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = ({ loading }) => {
  return (
    <div className={css.loaderStyle}>
      <Hearts
        visible={loading}
        height="80"
        width="80"
        color="#5ad4f3"
        ariaLabel="hearts-loading"
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
