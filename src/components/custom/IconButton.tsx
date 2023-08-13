import React from "react";
import { IconButton as MUIIconButton, IconButtonProps } from "@mui/material";
import { useTheme } from "contexts";

type Props = IconButtonProps & {
  children: React.ReactNode;
};

export const IconButton = (props: Props) => {
  const { theme } = useTheme();

  return (
    <MUIIconButton {...props} sx={{ color: theme.palette.font.color }}>
      {props.children}
    </MUIIconButton>
  );
};
