import { Fragment } from "react";
import { useField } from "informed";

const TextInput = (props) => {
  const { fieldType, ...restProps } = props;
  const { render, informed, userProps, fieldState, ref } = useField({
    type: "text",
    ...props,
  });
  const { type, label, id, ...rest } = userProps;
  const { showError, error } = fieldState;
  const style = showError ? { border: "solid 1px red" } : null;
  return render(
    <Fragment>
      <input
        id={id}
        type={fieldType}
        ref={ref}
        {...rest}
        {...informed}
        style={style}
      />
      {showError && <small style={{ color: "red" }}>{error}</small>}
    </Fragment>
  );
};

TextInput.defaultProps = {
  fieldType: "text",
};

export default TextInput;
