import React from "react";
import { Fab as MUIFab } from "@mui/material";
import { useApp, useTheme } from "contexts";
import { HValidation } from "helpers";

// icons
import {
  Add,
  Edit,
  Delete,
  FilterAlt,
  CloseOutlined,
  MenuOpenOutlined,
} from "@mui/icons-material";

type Props = {
  sx?: any;
  onClick?: () => void;
  children?: React.ReactNode;
  variant?: "add" | "edit" | "delete" | "filter" | "list" | "hide";
};

export const Fab = (props: Props) => {
  const { t } = useApp();
  const { theme } = useTheme();

  const text =
    props.variant === "add"
      ? t.action.add
      : props.variant === "edit"
      ? t.action.edit
      : props.variant === "delete"
      ? t.action.delete
      : props.variant === "list"
      ? t.action.list_view
      : props.variant === "filter"
      ? t.action.filter
      : "";

  const mr = HValidation.hasValue(text) ? theme.margin.xs : 0;

  const icon =
    props.variant === "add" ? (
      <Add sx={{ mr }} />
    ) : props.variant === "edit" ? (
      <Edit sx={{ mr }} />
    ) : props.variant === "delete" ? (
      <Delete sx={{ mr }} />
    ) : props.variant === "list" ? (
      <MenuOpenOutlined sx={{ mr }} />
    ) : props.variant === "hide" ? (
      <CloseOutlined sx={{ mr }} />
    ) : (
      <FilterAlt sx={{ mr }} />
    );

  return (
    <MUIFab
      variant="extended"
      sx={{
        position: "fixed",
        right: theme.margin.default,
        bottom: theme.margin.default,
        ...props.sx,
      }}
      onClick={props.onClick}
    >
      {props.children ? (
        props.children
      ) : (
        <>
          {icon} {text}
        </>
      )}
    </MUIFab>
  );
};
