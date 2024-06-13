import AsyncStorage from "@react-native-async-storage/async-storage";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Box, useTheme } from "native-base";
import { useState } from "react";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const [loged, setLoged] = useState(false);

  const { colors } = useTheme();
  const THEME = DefaultTheme;
  THEME.colors.background = colors.gray[700];

  async function verify() {
    const storage = await AsyncStorage.getItem("userLoged");
    if (storage) return setLoged(true);
    return setLoged(false);
  }

  // useEffect(() => {
  //   verify();
  // }, []);

  return (
    <Box bg={"gray.700"} flex={1}>
      <NavigationContainer theme={THEME}>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  );
}
