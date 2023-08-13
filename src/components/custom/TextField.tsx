import React, { forwardRef } from "react";
import InputMask from "react-input-mask";
import { TextField as MUITextField, TextFieldProps } from "@mui/material";
import { useTheme } from "contexts";
import { Constants } from "utils";
import { HValidation } from "helpers";

type Props = TextFieldProps & {
  sx?: any;
  id?: string;
  type?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  value?: any;
  mask?: string;
  focused?: boolean;
  disabled?: boolean;
  required?: boolean;
  multiline?: boolean;
  size?: "small" | "medium" | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export const TextField = forwardRef((props: Props, ref: React.Ref<any>) => {
  const { theme } = useTheme();

  function renderTextField() {
    const conditionalProps = !props.mask
      ? {
          value: props.value,
          onBlur: props.onBlur,
          disabled: props.disabled,
          onChange: props.onChange,
        }
      : {};

    return (
      <MUITextField
        {...props}
        {...conditionalProps}
        variant="outlined"
        type={props.type}
        id={props.id}
        ref={ref}
        size={props.size}
        autoComplete="off"
        name={props.name}
        label={props.label}
        autoFocus={props.focused}
        minRows={props.multiline ? Constants.TEXTAREA.MIN : undefined}
        maxRows={props.multiline ? Constants.TEXTAREA.MAX : undefined}
        multiline={props.multiline}
        placeholder={props.placeholder}
        required={props.required ?? false}
        hiddenLabel={!HValidation.hasValue(props.label)}
        sx={{
          width: 1,
          borderRadius: theme.border.radius,
          "& .MuiInputBase-input": {
            borderRadius: theme.border.radius / 4,
          },
          ...props.sx,
        }}
      />
    );
  }

  return props.mask ? (
    <InputMask
      // disabled={props.disabled}
      mask={props.mask}
      value={props.value}
      onBlur={props.onBlur}
      onChange={props.onChange}
    >
      {renderTextField()}
    </InputMask>
  ) : (
    renderTextField()
  );
});
