import React from "react";
import { Button as MUIButton, ButtonProps } from "@mui/material";
import { useTheme } from "contexts";
import { HString } from "helpers";

type Props = ButtonProps & {
  sx?: any;
  text?: boolean;
  submit?: boolean;
  tabIndex?: number;
  secondary?: boolean;
  children: string | React.ReactNode;
  onClick?: (event: any) => void;
};

export const Button = (props: Props) => {
  const { theme } = useTheme();
  const accentColor = props.sx?.backgroundColor ?? theme.color.accent.color;
  const contractColor = HString.getContrast(accentColor);

  function handleClick(event: any) {
    props.onClick && props.onClick(event);
  }

  return (
    <MUIButton
      size={props.size}
      href={props.href}
      disabled={props.disabled}
      tabIndex={props.tabIndex}
      variant={props.secondary ? "outlined" : props.text ? "text" : "contained"}
      sx={{
        borderRadius: theme.border.radius,
        borderColor: props.secondary ? accentColor : null,
        backgroundColor:
          props.secondary || props.text ? "transparent" : accentColor,
        color: props.secondary || props.text ? accentColor : contractColor,
        "&:hover": {
          opacity: 0.8,
          color: props.secondary || props.text ? accentColor : contractColor,
          backgroundColor:
            props.secondary || props.text ? "transparent" : accentColor,
          borderColor: accentColor,
          ...props.sx,
        },
      }}
      onClick={handleClick}
      type={props.submit ? "submit" : "button"}
    >
      {props.children}
    </MUIButton>
  );
};
