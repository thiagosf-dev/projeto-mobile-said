import { Heading, HStack, Text, VStack } from "native-base";
import { TouchableOpacityProps } from "react-native";
import { IExamData } from "src/@MOCKS/ExamsData";
import { IUserData } from "src/@MOCKS/LoginData";

type Props = TouchableOpacityProps & {
  exam: IExamData;
  user: IUserData;
};

export function ExamsCard({ exam, user }: Props) {
  return (
    <VStack
      bg={"gray.500"}
      mb={3}
      p={4}
      rounded={"lg"}
      justifyContent={"space-around"}
    >
      <HStack flex={1} justifyContent={"space-around"} alignItems={"center"}>
        <Heading color={"white"} fontFamily={"heading"} fontSize={"lg"}>
          DIA: {exam.dia}/{exam.mes}
        </Heading>
        <Heading color={"white"} fontFamily={"heading"} fontSize={"lg"}>
          ÀS: {exam.hour}:00h
        </Heading>
      </HStack>

      {exam.exam.length &&
        exam.exam.map((exam) => (
          <VStack flex={1} key={exam.name}>
            <Text color={"gray.200"} fontSize={"sm"} mt={1}>
              {exam.name}
            </Text>
          </VStack>
        ))}
    </VStack>
  );
}
