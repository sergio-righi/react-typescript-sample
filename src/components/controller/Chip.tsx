import { FunctionComponent, useState } from "react";
import { Stack } from "@mui/material";
import { Custom } from "components";
import { useTheme } from "contexts";

type Props = {
  sx?: any;
  wrap?: boolean;
  itemStyle?: any;
  multiple?: boolean;
  disabled?: boolean;
  items: Custom.ChipProps[];
  onSelect?: (value: any) => void;
};

export const Chip: FunctionComponent<Props> = (props: Props) => {
  const { theme } = useTheme();
  const [selected, setSelected] = useState<any>([]);
  const [incrementComponent, setIncrementComponent] = useState<number>(1);

  const isSelected = (value: string | number): boolean =>
    selected.indexOf(value) !== -1;

  function handleSelect(value: string | number) {
    const index = selected.indexOf(value);
    if (props.multiple) {
      if (index === -1) selected.push(value);
      else selected.splice(index, 1);
    } else {
      selected.splice(0, 1);
      selected.push(value);
    }
    setIncrementComponent(incrementComponent + 1);
    props.onSelect && props.onSelect(selected);
  }

  return (
    <Stack
      direction="row"
      sx={props.sx}
      flexWrap={props.wrap ? "wrap" : undefined}
      gap={props.wrap ? theme.margin.md : undefined}
      spacing={props.wrap ? undefined : theme.margin.md}
    >
      {props.items.map((item: Custom.ChipProps, i: number) => (
        <Custom.Chip
          {...item}
          key={i}
          sx={props.itemStyle}
          onClick={handleSelect}
          disabled={props.disabled}
          selected={isSelected(item.id ?? item.label)}
        />
      ))}
    </Stack>
  );
};

Chip.defaultProps = {
  wrap: false,
  multiple: false,
};
