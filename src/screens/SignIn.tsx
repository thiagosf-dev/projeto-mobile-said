import {
  Center,
  Heading,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";

import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Controller, useForm } from "react-hook-form";
import { IUserData } from "src/@MOCKS/LoginData";
import * as yup from "yup";
import { useEffect } from "react";

type FormDataProps = {
  email: string;
  password: string;
};

const SignUpSchema = yup.object({
  email: yup
    .string()
    .required("O campo E-mail deve ser preenchido")
    .email("E-mail inválido"),
  password: yup
    .string()
    .required("O campo Senha deve ser preenchido")
    .min(3, "A Senha deve ter ao menos 3 caracteres"),
});

export function SignIn() {
  const toast = useToast();
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  const {
    control,
    formState: { errors, isSubmitting, isValidating },
    handleSubmit,
    resetField,
  } = useForm<FormDataProps>({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleNewAccount() {
    navigate("signUp");
  }

  async function handleSignIn({ email, password }: FormDataProps) {
    await AsyncStorage.removeItem("userLoged");

    const storage = await AsyncStorage.getItem("users");
    const users: IUserData[] = storage ? JSON.parse(storage) : [];

    if (!users) {
      return toast.show({
        bg: "red.500",
        placement: "top",
        title: "Usuário/Senha inválido(s).",
      });
    }

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      return toast.show({
        bg: "red.500",
        placement: "top",
        title: "Usuário/Senha inválido(s).",
      });
    }

    const userLoged: string = JSON.stringify(user);
    await AsyncStorage.setItem("userLoged", userLoged);

    navigate("home");
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} pb={16} px={10}>
        <Center my={40}>
          <Text
            color={"green.500"}
            fontFamily={"heading"}
            fontSize={"3xl"}
            mt={-10}
          >
            MEUS EXAMES
          </Text>

          <Text color={"gray.100"} fontSize={"sm"} mt={1}>
            Faça o agendamento de suas consultas
          </Text>
        </Center>

        <Center>
          <Heading
            color={"gray.100"}
            fontFamily={"heading"}
            fontSize={"xl"}
            mb={6}
          >
            Acesse sua conta
          </Heading>

          <Controller
            control={control}
            name={"email"}
            render={({ field: { onChange, value } }) => (
              <Input
                autoCapitalize={"none"}
                errorMessage={errors.email?.message}
                isDisabled={isValidating || isValidating}
                keyboardType={"email-address"}
                placeholder={"E-mail"}
                value={value}
                onChangeText={onChange}
                onSubmitEditing={handleSubmit(handleSignIn)}
              />
            )}
          />

          <Controller
            name={"password"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                autoCapitalize={"none"}
                errorMessage={errors.password?.message}
                isDisabled={isValidating || isValidating}
                placeholder={"Senha"}
                returnKeyType={"send"}
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onSubmitEditing={handleSubmit(handleSignIn)}
              />
            )}
          />

          <Button
            bg={"green.700"}
            disabled={isSubmitting || isValidating}
            h={14}
            title={"Acessar"}
            variant={"solid"}
            w={"full"}
            onPress={handleSubmit(handleSignIn)}
          />
        </Center>

        <Center mt={10}>
          <Text color={"gray.100"} fontFamily={"body"} fontSize={"sm"}>
            Ainda não tem acesso?
          </Text>

          <Button
            disabled={isSubmitting || isValidating}
            title="Criar Conta"
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
