import { PairValue } from "types";
import { useApp, useTheme } from "contexts";
import { Autocomplete as MUIAutocomplete, TextField } from "@mui/material";

export type Props = {
  sx?: any;
  name?: string;
  label?: string;
  limitTags?: number;
  multiple?: boolean;
  placeholder?: string;
  items: PairValue[];
  value?: PairValue[];
  onChange?: (
    event: React.SyntheticEvent<Element, Event>,
    value: PairValue | null
  ) => void;
  onInputChange?: (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => void;
};

export const Autocomplete = (props: Props) => {
  const { t } = useApp();
  const { theme } = useTheme();

  return (
    <MUIAutocomplete
      multiple={false}
      onChange={(
        event: React.SyntheticEvent<Element, Event>,
        value: PairValue | null
      ) => props.onChange && props.onChange(event, value)}
      noOptionsText={t.message.placeholder.no_option}
      options={props.items.map((item: PairValue) => item)}
      getOptionLabel={(option: PairValue) => option.value}
      onInputChange={(
        event: React.SyntheticEvent<Element, Event>,
        value: string
      ) => props.onInputChange && props.onInputChange(event, value)}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.border,
            },
            "& .MuiButtonBase-root": {
              color: theme.palette.font.accent,
            },
            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.color.accent.color,
              },
            },
          }}
          variant="outlined"
          name={props.name}
          label={props.label}
          placeholder={props.placeholder}
        />
      )}
    />
  );
};
