import { Switch as MUISwitch, SwitchProps } from "@mui/material";

type Props = SwitchProps & {};

export const Switch = (props: Props) => {
  return <MUISwitch {...props} edge="end" onChange={props.onChange} />;
};
