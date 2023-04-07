import { Fragment } from "react";
import { useField } from "informed";

const TextInput = (props) => {
  const { type, ...restProps } = props;
  console.log(type)
  const { render, informed, userProps, fieldState, ref } = useField({
    type: "text",
    ...restProps,
  });
  const { id, style, ...rest } = userProps;
  const { showError, error } = fieldState;
  const errorStyle = showError ? { border: "solid 1px red" } : {};
  return render(
    <Fragment>
      <input
        id={id}
        {...rest}
        type={type}
        ref={ref}
        {...informed}
        style={{...style, ...errorStyle}}
      />
      {showError && <small style={{ color: "red" }}>{error}</small>}
    </Fragment>
  );
};

TextInput.defaultProps = {
  type: "text",
  style: {}
};

export default TextInput;
