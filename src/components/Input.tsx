import {
  FormControl,
  IInputProps,
  Input as NativeBaseInput,
  Text,
} from "native-base";

type Props = IInputProps & {
  errorMessage?: string | null;
};

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={6}>
      <NativeBaseInput
        bg={"gray.600"}
        borderWidth={0}
        color={"white"}
        fontFamily={"body"}
        fontSize={"md"}
        h={14}
        isInvalid={invalid}
        px={4}
        _focus={{
          bg: "gray.700",
          borderColor: "green.500",
          borderWidth: 1,
        }}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.600",
        }}
        {...rest}
      />

      <FormControl.ErrorMessage>
        <Text color={"red.400"} fontFamily={"heading"} fontSize={"xs"}>
          {errorMessage}
        </Text>
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
