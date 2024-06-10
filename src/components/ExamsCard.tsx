import { Entypo } from "@expo/vector-icons";
import { Heading, HStack, Icon, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { IExamData } from "src/@MOCKS/ExamsData";

type Props = TouchableOpacityProps & {
  exam: IExamData;
};

export function ExamsCard({ exam, ...rest }: Props) {
  return (
    <HStack
      alignItems={"center"}
      bg={"gray.500"}
      mb={3}
      p={4}
      rounded={"lg"}
      justifyContent={"space-around"}
    >
      <VStack flex={1}>
        <Heading color={"white"} fontFamily={"heading"} fontSize={"lg"}>
          {exam.name}
        </Heading>
        <Text color={"gray.200"} fontSize={"sm"} mt={1} numberOfLines={2}>
          {exam.type.name}
        </Text>
      </VStack>

      <VStack flex={1}>
        <Heading
          color={"white"}
          fontFamily={"heading"}
          fontSize={"sm"}
          textAlign={"right"}
        >
          {exam.data}
        </Heading>
        <Text
          color={"gray.200"}
          fontSize={"sm"}
          mt={1}
          numberOfLines={2}
          textAlign={"right"}
        >
          {exam.hour}
        </Text>
      </VStack>
    </HStack>
  );
}
