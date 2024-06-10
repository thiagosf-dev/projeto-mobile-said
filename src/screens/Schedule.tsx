import { Group } from "@components/Group";
import { ScreenHeader } from "@components/ScreenHeader";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Box, Divider, FlatList, HStack, VStack } from "native-base";
import { useState } from "react";
import {
  IExamType,
  IOcupacionalList,
  IOutrosList,
  OCUPACIONAL_LIST,
  OUTROS_LIST,
  TYPES_LIST,
} from "src/@MOCKS/ExamsData";

export function Schedule() {
  const [examsSelected, setExamsSeclected] = useState<
    IOcupacionalList[] | IOutrosList[]
  >([] as IOcupacionalList[] | IOutrosList[]);

  const [groupSelected, setGroupSelected] = useState<IExamType>(
    {} as IExamType
  );

  const [selecteds, setSelecteds] = useState<string[]>([]);

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

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

  function handleOpenExerciseDetails() {
    navigate("exercise");
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title={"Seleção de Exames"} />

      <Divider bg={"green.400"} mb={5} />

      <FlatList
        data={TYPES_LIST}
        horizontal
        keyExtractor={(item) => item.name}
        maxH={20}
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
          <Divider alignSelf={"center"} bg={"green.400"} my={5} w={100} />

          {OCUPACIONAL_LIST.map((item) => (
            <Box key={item.name} px={8}>
              <Group
                isActive={selecteds.includes(item.name)}
                name={item.name}
                onPress={() => handleSelectExam(item)}
                h={12}
                px={4}
              />
            </Box>
          ))}
        </>
      )}

      {groupSelected.name === "Outros" && (
        <>
          <Divider alignSelf={"center"} bg={"green.400"} my={5} w={100} />

          {OUTROS_LIST.map((item) => (
            <HStack key={item.name} justifyContent={"center"} px={8}>
              <Group
                isActive={selecteds.includes(item.name)}
                name={item.name}
                onPress={() => handleSelectExam(item)}
                h={12}
                px={4}
              />
            </HStack>
          ))}
        </>
      )}

      {/* <FlatList
        data={groups.}
        horizontal
        keyExtractor={(item) => item.name}
        maxH={10}
        minH={10}
        my={5}
        renderItem={({ item }) => (
          <Group
            isActive={groupSelected === item.name}
            name={item}
            onPress={() => setGroupSelected(item)}
          />
        )}
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          px: 8,
        }}
      /> */}

      <Divider alignSelf={"center"} bg={"green.400"} my={8} w={100} />

      {/* <VStack flex={1} px={8}>
        <HStack alignItems={"center"} justifyContent={"space-between"} mb={5}>
          <Heading color={"gray.200"} fontFamily={"heading"} fontSize={"md"}>
            Exercícios
          </Heading>

          <Text color={"gray.200"} fontSize={"sm"}>
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
        />
      </VStack> */}
    </VStack>
  );
}
