import { IImageProps, Image } from "native-base";

type Props = IImageProps & {
  size: number;
};

export function UserPhoto({ size, ...rest }: Props) {
  return (
    <Image
      borderColor="green.400"
      borderWidth={2}
      h={size}
      rounded="full"
      w={size}
      {...rest}
    />
  );
}
