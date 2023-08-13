import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MUISelect,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import { HValidation } from "helpers";
import { PairValue } from "types";
import { useTheme } from "contexts";

type Props = SelectProps & {
  label?: string;
  items: PairValue[];
  value?: number | "";
  onChange?: (value: number) => void;
  onDropdownChange?: (event: SelectChangeEvent<number>) => void;
};

export const Select = (props: Props) => {
  const { theme } = useTheme();
  const [value, setValue] = useState<number | "">(props.value ?? "");

  useEffect(() => setValue(props.value ?? ""), [props.value]);

  const variant = HValidation.hasValue(props.label) ? "filled" : "outlined";

  const handleChange = (value: number): void => {
    setValue(value);
    props.onChange && props.onChange(value);
  };

  const handleDropdownChange = (event: SelectChangeEvent<number>): void =>
    props.onDropdownChange && props.onDropdownChange(event);

  return (
    props.items && (
      <FormControl
        variant={variant}
        sx={{ width: 1, display: "flex", flexDirection: "row" }}
      >
        {props.label && (
          <InputLabel
            id={props.id}
            sx={{
              color: props.disabled
                ? theme.palette.background.accent
                : theme.palette.font.color,
            }}
          >
            {props.label}
          </InputLabel>
        )}
        <MUISelect
          name={props.name}
          labelId={props.id}
          value={value}
          disabled={props.disabled}
          onChange={handleDropdownChange}
          sx={{
            width: 1,
            "& .MuiSelect-icon": {
              color: props.disabled
                ? theme.palette.background.accent
                : theme.palette.font.color,
            },
            "& .MuiFormLabel-root": {
              color: theme.palette.font.color,
            },
            "& .MuiSelect-select": {
              color: theme.palette.font.color,
            },
            "& .MuiSelect-filled": {
              borderRadius: theme.border.radius / 4,
              backgroundColor: theme.palette.background.color,
              borderBottomWidth: 2,
              borderBottomStyle: "solid",
              borderBottomColor: theme.palette.background.color,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              "&:focus": {
                borderBottomColor: theme.color.primary.color,
              },
            },
          }}
          MenuProps={{
            MenuListProps: {
              sx: {
                color: theme.palette.font.color,
                backgroundColor: theme.palette.background.accent,
              },
            },
          }}
        >
          {props.items.map((item: PairValue) => (
            <MenuItem
              key={item.key}
              value={item.key}
              onClick={() => handleChange(item.key)}
            >
              {item.value}
            </MenuItem>
          ))}
        </MUISelect>
      </FormControl>
    )
  );
};
