import {
  Center,
  Heading,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";

import LogoSVG from "@assets/logo.svg";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Controller, useForm } from "react-hook-form";
import { LOGIN_DATA } from "src/@MOCKS/LoginData";
import * as yup from "yup";

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
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const {
    control,
    formState: { errors, isSubmitting, isValidating },
    handleSubmit,
  } = useForm<FormDataProps>({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleNewAccount() {
    navigate("home");
  }

  function handleSignIn({ email, password }: FormDataProps) {
    const user = LOGIN_DATA.users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      LOGIN_DATA.hasUserLogged = true;
      LOGIN_DATA.userLogged = {
        email,
        name: user.name,
        password,
      };
      return navigate("home");
    }

    return toast.show({
      bg: "red.500",
      placement: "top",
      title: "Usuário/Senha inválido(s).",
    });
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} pb={16} px={10}>
        <Center my={10}>
          <LogoSVG scaleX={0.5} scaleY={0.5} />

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
