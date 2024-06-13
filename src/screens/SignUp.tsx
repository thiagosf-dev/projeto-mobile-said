import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Center, Heading, ScrollView, useToast, VStack } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { IUserData } from "src/@MOCKS/LoginData";
import * as yup from "yup";

type FormDataProps = {
  email: string;
  name: string;
  password: string;
  password_confirm: string;
};

const SignUpSchema = yup.object({
  email: yup
    .string()
    .required("O campo E-mail deve ser preenchido")
    .email("E-mail inválido"),
  name: yup.string().required("O campo Nome deve ser preenchido"),
  password: yup
    .string()
    .required("O campo Senha deve ser preenchido")
    .min(3, "A Senha deve ter ao menos 3 caracteres"),
  password_confirm: yup
    .string()
    .required("O campo Confirmar Senha deve ser preenchido")
    .oneOf([yup.ref("password")], "A confirmação da senha não confere"),
});

export function SignUp() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  const toast = useToast();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormDataProps>({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      password_confirm: "",
    },
  });

  function handleLogin() {
    navigate("signIn");
  }

  async function handleSignUp({ email, name, password }: FormDataProps) {
    const userLoged: IUserData = {
      email,
      name,
      password,
    };

    const storage = await AsyncStorage.getItem("users");
    const users: IUserData[] = storage ? JSON.parse(storage) : [];

    const user = users.find((user) => user.email === email);

    if (user) {
      return toast.show({
        bg: "red.500",
        placement: "top",
        title: "Já existe um usuário com este e-mail cadastrado.",
      });
    }

    const newStorage: string = JSON.stringify(
      users.length > 0 ? [...users, userLoged] : [userLoged]
    );
    await AsyncStorage.setItem("users", newStorage);

    const loged: string = JSON.stringify(user);
    await AsyncStorage.setItem("userLoged", JSON.stringify(userLoged));

    navigate("home");
  }

  async function handleZerar() {
    await AsyncStorage.removeItem("users");
    await AsyncStorage.removeItem("exams");
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} pb={16} px={10}>
        <Center my={40}>
          <Heading
            color={"gray.100"}
            fontFamily={"heading"}
            fontSize={"xl"}
            mb={6}
          >
            Crie sua conta
          </Heading>

          <Controller
            name={"name"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                errorMessage={errors.name?.message}
                placeholder={"Nome"}
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            name={"email"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                autoCapitalize={"none"}
                errorMessage={errors.email?.message}
                keyboardType={"email-address"}
                placeholder={"E-mail"}
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            name={"password"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                errorMessage={errors.password?.message}
                placeholder={"Senha"}
                secureTextEntry
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            name={"password_confirm"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                errorMessage={errors.password_confirm?.message}
                placeholder={"Confirmar senha"}
                returnKeyType={"send"}
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onSubmitEditing={handleSubmit(handleSignUp)}
              />
            )}
          />

          <Button
            bg={"green.700"}
            h={14}
            title={"Criar e acessar"}
            variant={"solid"}
            w={"full"}
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>

        <Button
          mt={12}
          title="Voltar para o login"
          variant="outline"
          onPress={handleLogin}
        />
        <Button mt={12} title="ZERAR" variant="outline" onPress={handleZerar} />
      </VStack>
    </ScrollView>
  );
}
