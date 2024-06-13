import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Heading, HStack, Icon, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { IUserData } from "src/@MOCKS/LoginData";
import { UserPhoto } from "./UserPhoto";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  user?: IUserData | null;
};

export function HomeHeader({ user = null }: Props) {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  async function handleLogout() {
    await AsyncStorage.removeItem("userLoged");
    navigate("signIn");
  }

  return (
    <HStack alignItems={"center"} bg={"gray.600"} pb={5} pt={16} px={8}>
      <UserPhoto
        alt={"Imagem do usuário"}
        mr={4}
        size={16}
        source={{
          uri: "https://cdn.pixabay.com/photo/2016/06/15/16/16/man-1459246_1280.png",
        }}
      />

      <VStack flex={1}>
        <Heading
          color={"gray.100"}
          fontFamily={"heading"}
          fontSize={"md"}
          textTransform={"capitalize"}
        >
          Olá {user?.name}
        </Heading>

        <Text color={"gray.100"} fontSize={"sm"}>
          {user?.email}
        </Text>
      </VStack>

      <TouchableOpacity onPress={handleLogout}>
        <Icon as={MaterialIcons} color={"gray.200"} name={"logout"} size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
