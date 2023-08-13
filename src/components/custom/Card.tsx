import React from "react";
import { Card as MUICard, CardContent } from "@mui/material";
import { useTheme } from "contexts";
import { Custom } from "components";
import { HValidation } from "helpers";

type Props = {
  sx?: any;
  title?: string;
  href?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
};

export const Card = (props: Props) => {
  const { theme } = useTheme();
  const hasTitle = HValidation.hasValue(props.title);

  return (
    <MUICard
      sx={{
        color: theme.palette.font.color,
        borderRadius: theme.border.radius,
        backgroundColor: theme.palette.background.accent,
      }}
    >
      <CardContent sx={props.sx}>
        {hasTitle && (
          <Custom.Typography variant="h4">{props.title}</Custom.Typography>
        )}
        {props.children}
      </CardContent>
    </MUICard>
  );
};
