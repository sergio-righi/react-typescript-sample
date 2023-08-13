import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ServiceProvider, useTheme } from "contexts";
import { ThemeProvider } from "@mui/material/styles";
import { Themes } from "utils";

export const DefaultLayout = () => {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={Themes.defaultTheme(theme)}>
      <ServiceProvider>
        <Box>
          <Outlet />
        </Box>
      </ServiceProvider>
    </ThemeProvider>
  );
};
