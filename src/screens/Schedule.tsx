import { Button } from "@components/Button";
import { Group } from "@components/Group";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import {
  Box,
  Center,
  Divider,
  FlatList,
  Heading,
  HStack,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Keyboard } from "react-native";
import {
  EXAMS_DATA,
  IExamData,
  IExamType,
  IOcupacionalList,
  IOutrosList,
  OCUPACIONAL_LIST,
  OUTROS_LIST,
  TYPES_LIST,
} from "src/@MOCKS/ExamsData";
import { IUserData } from "src/@MOCKS/LoginData";
import * as yup from "yup";

type FormDataProps = {
  dia: string;
  mes: string;
  hour: string;
};

const SignUpSchema = yup.object({
  dia: yup.string().required("O campo Dia deve ser preenchido"),
  mes: yup.string().required("O campo Mês deve ser preenchido"),
  hour: yup.string().required("O campo Hora deve ser preenchido"),
});

export function Schedule() {
  const [userLogged, setUserLogged] = useState<IUserData | null>(
    {} as IUserData
  );

  const [examsSelected, setExamsSeclected] = useState<
    IOcupacionalList[] | IOutrosList[]
  >([] as IOcupacionalList[] | IOutrosList[]);

  const [groupSelected, setGroupSelected] = useState<IExamType>(
    {} as IExamType
  );

  const [selecteds, setSelecteds] = useState<string[]>([]);

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const toast = useToast();

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormDataProps>({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      dia: "",
      mes: "",
      hour: "",
    },
  });

  function handleSelectGroup(groupSelected: IExamType) {
    setGroupSelected(groupSelected);
  }

  function handleSelectExam(examSelected: IOcupacionalList | IOutrosList) {
    const existing = examsSelected.find(
      (data) => data.name === examSelected.name
    );

    if (!existing) {
      return setExamsSeclected((data) => {
        const result = [...data, { ...examSelected, selected: true }] as
          | IOcupacionalList[]
          | IOutrosList[];

        const checks = [...selecteds, examSelected.name];
        setSelecteds(checks);
        return result;
      });
    }

    return setExamsSeclected((data) => {
      const result = data.filter(
        (payload) => payload.name !== examSelected.name
      ) as IOcupacionalList[] | IOutrosList[];

      const checks = selecteds.filter((data) => data !== examSelected.name);
      setSelecteds(checks);
      return result;
    });
  }

  function handleScheduling(info: FormDataProps) {
    Keyboard.dismiss();

    Alert.alert(
      "Confirmar pagamento",
      "Ao confirmar o pagamento, todos os exames selecionados serão agendados para a data e a hora informados",
      [
        {
          isPreferred: true,
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () => {
            executeScheduling(info);
          },
          style: "destructive",
        },
      ],
      {
        cancelable: true,
        userInterfaceStyle: "dark",
      }
    );
  }

  async function executeScheduling({ dia, hour, mes }: FormDataProps) {
    const examsScheduling: IExamData = {
      dia,
      mes,
      hour,
      exam: examsSelected,
      type: groupSelected,
      user: userLogged as IUserData,
    };

    EXAMS_DATA.push(examsScheduling);

    const storage = await AsyncStorage.getItem("exams");
    const exams: IExamData[] = storage ? JSON.parse(storage) : [];
    const newStorage: string = JSON.stringify([...exams, examsScheduling]);
    await AsyncStorage.setItem("exams", newStorage);

    navigate("home");
  }

  function handleHomeNavigate() {
    navigate("home");
  }

  async function verifyUserLogged() {
    const storage = await AsyncStorage.getItem("userLoged");
    setUserLogged(JSON.parse(storage as string) ?? null);
  }

  useEffect(() => {
    verifyUserLogged();
  }, []);

  return (
    <VStack justifyContent={"space-between"} flex={1}>
      <ScreenHeader title={"Seleção de Exames"} />

      <VStack flex={1}>
        <Divider bg={"green.400"} />

        <FlatList
          flex={1}
          data={TYPES_LIST}
          horizontal
          keyExtractor={(item) => item.name}
          maxH={20}
          minH={20}
          renderItem={({ item }) => (
            <Group
              isActive={groupSelected.name === item.name}
              name={item.name}
              onPress={() => handleSelectGroup(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          _contentContainerStyle={{
            alignItems: "center",
            flex: 1,
            flexDir: "row",
            justifyContent: "center",
            px: 8,
          }}
        />

        {groupSelected.name === "Ocupacional" && (
          <>
            <Divider alignSelf={"center"} bg={"green.400"} w={100} mb={2} />

            <HStack
              maxH={80}
              minH={20}
              alignItems={"center"}
              flexWrap={"wrap"}
              justifyContent={"center"}
              px={8}
            >
              {OCUPACIONAL_LIST.map((item) => (
                <Group
                  key={item.name}
                  isActive={selecteds.includes(item.name)}
                  name={item.name}
                  onPress={() => handleSelectExam(item)}
                  h={12}
                  px={4}
                />
              ))}
            </HStack>
          </>
        )}

        {groupSelected.name === "Outros" && (
          <>
            <Divider alignSelf={"center"} bg={"green.400"} w={100} mb={2} />

            <HStack
              alignItems={"center"}
              flexWrap={"wrap"}
              justifyContent={"center"}
              px={8}
            >
              {OUTROS_LIST.map((item) => (
                <Group
                  key={item.name}
                  isActive={selecteds.includes(item.name)}
                  name={item.name}
                  onPress={() => handleSelectExam(item)}
                  h={12}
                  px={4}
                />
              ))}
            </HStack>
          </>
        )}

        <Divider alignSelf={"center"} bg={"green.400"} w={100} my={2} />

        {examsSelected.length > 0 && (
          <VStack mt={5}>
            <Center mb={5}>
              <Heading
                color={"gray.100"}
                fontFamily={"heading"}
                fontSize={"md"}
                mb={1}
              >
                Informações do Agendamento
              </Heading>
            </Center>

            <HStack justifyContent={"space-evenly"} mb={40}>
              <Box>
                <Controller
                  name={"dia"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <Text
                        color={"gray.300"}
                        fontFamily={"heading"}
                        fontSize={"md"}
                      >
                        DIA:
                      </Text>
                      <Input
                        errorMessage={errors.dia?.message}
                        keyboardType={"numeric"}
                        maxLength={2}
                        value={value}
                        w={60}
                        onChangeText={onChange}
                      />
                    </>
                  )}
                />
              </Box>

              <Box>
                <Controller
                  name={"mes"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <Text
                        color={"gray.300"}
                        fontFamily={"heading"}
                        fontSize={"md"}
                      >
                        MÊS:
                      </Text>
                      <Input
                        errorMessage={errors.mes?.message}
                        keyboardType={"numeric"}
                        maxLength={2}
                        value={value}
                        w={60}
                        onChangeText={onChange}
                      />
                    </>
                  )}
                />
              </Box>

              <Box>
                <Controller
                  name={"hour"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <Text
                        color={"gray.300"}
                        fontFamily={"heading"}
                        fontSize={"md"}
                      >
                        HORA:
                      </Text>
                      <Input
                        errorMessage={errors.hour?.message}
                        keyboardType={"numeric"}
                        maxLength={2}
                        value={value}
                        w={60}
                        onChangeText={onChange}
                      />
                    </>
                  )}
                />
              </Box>
            </HStack>
          </VStack>
        )}
      </VStack>

      <Box p={2}>
        {isValid && (
          <Button
            bg={"green.700"}
            disabled={!isValid}
            h={14}
            mb={5}
            title={"REALIZAR PAGAMENTO"}
            variant={"solid"}
            w={"full"}
            onPress={handleSubmit(handleScheduling)}
          />
        )}

        <Button
          bg={"red.900"}
          h={14}
          title={"VOLTAR"}
          variant={"solid"}
          w={"full"}
          onPress={handleHomeNavigate}
        />
      </Box>
    </VStack>
  );
}
