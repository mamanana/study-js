import { Fragment } from "react";
import { useField } from "informed";

const Input = (props) => {
  const { render, informed, userProps, fieldState, ref } = useField(props);
  const { label, id, ...rest } = userProps;
  const { showError } = fieldState;
  const style = showError ? { border: "solid 1px red" } : null;
  return render(
    <Fragment>
      <input id={id} ref={ref} {...rest} {...informed} style={style} />
      {showError && <small style={{ color: "red" }}>{fieldState.error}</small>}
    </Fragment>
  );
};

export default Input;
