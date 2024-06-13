import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { Home } from "@screens/Home";
import { Schedule } from "@screens/Schedule";
import { SignIn } from "@screens/SignIn";
import { SignUp } from "@screens/SignUp";

type AuthRoutes = {
  signIn: undefined;
  signUp: undefined;
  home: undefined;
  schedule: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator
      initialRouteName={"signIn"}
      screenOptions={{ headerShown: false }}
    >
      <Screen component={SignIn} name={"signIn"} />

      <Screen component={SignUp} name={"signUp"} />

      <Screen name="home" component={Home} />

      <Screen name="schedule" component={Schedule} />
    </Navigator>
  );
}
