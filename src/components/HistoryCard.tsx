import { Heading, HStack, Text, VStack } from "native-base";

export function HistoryCard() {
  return (
    <HStack
      alignItems={"center"}
      bg={"gray.600"}
      justifyContent={"space-between"}
      mb={3}
      px={5}
      py={4}
      rounded={"md"}
      w={"full"}
    >
      <VStack flex={1} mr={5}>
        <Heading
          color={"white"}
          fontFamily={"heading"}
          fontSize={"md"}
          numberOfLines={1}
          textTransform={"capitalize"}
        >
          Costas
        </Heading>

        <Text color={"gray.100"} fontSize={"lg"} numberOfLines={1}>
          Puxada frontal
        </Text>
      </VStack>

      <Text color={"gray.300"} fontSize={"md"}>
        09:00
      </Text>
    </HStack>
  );
}
