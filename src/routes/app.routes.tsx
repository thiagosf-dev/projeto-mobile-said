import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Home } from "@screens/Home";

import HomeSvg from "@assets/home.svg";
import ScheduleSvg from "@assets/schedule.svg";
import { Schedule } from "@screens/Schedule";
import { useTheme } from "native-base";
import { Platform } from "react-native";
import { AuthRoutes } from "./auth.routes";

type AppRoutes = {
  exercise: undefined;
  history: undefined;
  home: undefined;
  profile: undefined;
  schedule: undefined;
  RootApp: undefined;
};

export type AppNavigatorRoutesProps = AppRoutes &
  BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { colors, sizes } = useTheme();

  const iconSize = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingBottom: sizes[8],
          paddingTop: sizes[8],
        },
      }}
    >
      <Screen
        component={Home}
        name={"home"}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} height={iconSize} width={iconSize} />
          ),
        }}
      />

      <Screen
        component={Schedule}
        name={"schedule"}
        options={{
          tabBarIcon: ({ color }) => (
            <ScheduleSvg fill={color} height={iconSize} width={iconSize} />
          ),
        }}
      />

      <Screen
        name="RootApp"
        component={AuthRoutes}
        options={{ headerShown: false }}
      />

      {/* <Screen
        component={Profile}
        name={"profile"}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSVG fill={color} height={iconSize} width={iconSize} />
          ),
        }}
      /> */}

      {/* <Screen
        component={Exercise}
        name={"exercise"}
        options={{ tabBarButton: () => null }}
      /> */}
    </Navigator>
  );
}
