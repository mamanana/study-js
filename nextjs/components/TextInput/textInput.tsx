import { Fragment } from "react";
import { useField } from "informed";

const TextInput = (props: any) => {
  const { type, ...restProps } = props;
  const { render, informed, userProps, fieldState, ref } = useField({
    type: "text",
    ...restProps,
  });
  const { id, style, icon, ...rest } = userProps;
  const { showError, error } = fieldState;
  const errorStyle = showError ? { border: "solid 1px red" } : {};
  return render(
    <Fragment>
      <div className="relative">
        <input
          {...rest}
          type={type}
          ref={ref}
          {...informed}
          style={{ ...style, ...errorStyle }}
        />
        {icon ? (
          <span className="absolute inset-y-0 right-0 grid place-content-center px-4">
            {icon}
          </span>
        ) : null}
      </div>

      {showError && <small style={{ color: "red" }}>{error}</small>}
    </Fragment>,
  );
};

TextInput.defaultProps = {
  type: "text",
  style: {},
};

export default TextInput;
