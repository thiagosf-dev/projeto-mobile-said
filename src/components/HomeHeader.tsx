import { MaterialIcons } from "@expo/vector-icons";
import { Heading, HStack, Icon, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { IUserData } from "src/@MOCKS/LoginData";
import { UserPhoto } from "./UserPhoto";

type Props = {
  user?: IUserData | null;
};

export function HomeHeader({ user = null }: Props) {
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
        <Text color={"gray.100"} fontSize={"md"}>
          Olá
        </Text>

        <Heading
          color={"gray.100"}
          fontFamily={"heading"}
          fontSize={"md"}
          textTransform={"capitalize"}
        >
          {user?.name}
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon as={MaterialIcons} color={"gray.200"} name={"logout"} size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
