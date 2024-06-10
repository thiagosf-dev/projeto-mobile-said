import { Entypo } from "@expo/vector-icons";
import { Heading, HStack, Icon, Image, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {};

export function ExerciseCard({ ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        alignItems={"center"}
        bg={"gray.500"}
        mb={3}
        p={2}
        pr={4}
        rounded={"xs"}
      >
        <Image
          alt={"Imagem de uma pessoa fazendo exercício para as costas"}
          h={16}
          mr={4}
          resizeMode={"cover"}
          source={{
            uri: "https://images.unsplash.com/photo-1534872850130-5355701fcc89?q=80&w=3448&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          w={16}
        />

        <VStack flex={1}>
          <Heading color={"white"} fontFamily={"heading"} fontSize={"lg"}>
            Remada unilateral
          </Heading>
          <Text color={"gray.200"} fontSize={"sm"} mt={1} numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>

        <Icon as={Entypo} color={"gray.300"} name="chevron-thin-right" />
      </HStack>
    </TouchableOpacity>
  );
}
