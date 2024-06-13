import { HStack, IPressableProps, Pressable, Text } from "native-base";

type Props = IPressableProps & {
  isActive: boolean;
  name: string;
};

export function Group({ isActive, name, ...rest }: Props) {
  return (
    <HStack flexDir={"row"}>
      <Pressable
        alignItems={"center"}
        bg={"gray.600"}
        h={10}
        isPressed={isActive}
        justifyContent={"center"}
        mr={3}
        my={2}
        rounded={"lg"}
        w={32}
        _pressed={{
          borderColor: "green.500",
          borderWidth: 1,
        }}
        {...rest}
      >
        <Text
          color={"gray.200"}
          fontSize={"xs"}
          fontWeight={"bold"}
          textTransform={"uppercase"}
        >
          {name}
        </Text>
      </Pressable>
    </HStack>
  );
}
