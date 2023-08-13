import React from "react";
import { useTheme } from "contexts";
import { Tabs as MUITabs, Tab as MUITab, Box } from "@mui/material";

type TabContentProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

const TabContent = (props: TabContentProps) => {
  const { theme } = useTheme();
  const { children, value, index, ...other } = props;

  return (
    <Box hidden={value !== index} id={`tab-content-${index}`}>
      {value === index && <Box sx={{ p: theme.margin.sm }}>{children}</Box>}
    </Box>
  );
};

export type TabProps = {
  key: string;
  label: string;
  children: React.ReactNode;
};

type Props = {
  selected?: number;
  items: TabProps[];
};

export const Tabs = (props: Props) => {
  const [selected, setSelected] = React.useState(props.selected ?? 0);

  function handleChange(_: React.SyntheticEvent, index: number) {
    setSelected(index);
  }

  return (
    <Box sx={{ width: 1, height: 1 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <MUITabs value={selected} variant="fullWidth" onChange={handleChange}>
          {props.items.map((item: TabProps, i: number) => (
            <MUITab value={i} key={item.key} label={item.label} />
          ))}
        </MUITabs>
      </Box>
      {props.items.map((item: TabProps, i: number) => (
        <TabContent key={i} value={selected} index={i}>
          {item.children}
        </TabContent>
      ))}
    </Box>
  );
};
