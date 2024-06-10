import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Box, useTheme } from "native-base";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const { colors } = useTheme();
  const THEME = DefaultTheme;
  THEME.colors.background = colors.gray[700];

  return (
    <Box bg={"gray.700"} flex={1}>
      <NavigationContainer theme={THEME}>
        <AppRoutes />
      </NavigationContainer>
    </Box>
  );
}
