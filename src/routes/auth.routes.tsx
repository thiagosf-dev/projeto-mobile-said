import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { SignIn } from "@screens/SignIn";
import { SignUp } from "@screens/SignUp";

type AuthRoutes = {
  signIn: undefined;
  signUp: undefined;
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
    </Navigator>
  );
}
