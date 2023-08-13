import {
  ColorSchema,
  ColorStatus,
} from "themes/interfaces";

export interface Color {
  primary: ColorSchema;
  secondary: ColorSchema;
  disabled: ColorSchema;
  accent: ColorSchema;
  status: ColorStatus;
  black: string;
  white: string;
}
