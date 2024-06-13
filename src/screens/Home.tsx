import { Button } from "@components/Button";
import { ExamsCard } from "@components/ExamsCard";
import { HomeHeader } from "@components/HomeHeader";
import { Loading } from "@components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { isLoading } from "expo-font";
import { Box, FlatList, Heading, VStack } from "native-base";
import { useEffect, useState } from "react";
import { IExamData } from "src/@MOCKS/ExamsData";
import { IUserData, LOGIN_DATA } from "src/@MOCKS/LoginData";

export function Home() {
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(true);
  const user = LOGIN_DATA.userLogged;
  const [examsList, setExamsList] = useState<IExamData[]>([]);
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();
  const [userLogged, setUserLogged] = useState<IUserData | null>(
    {} as IUserData
  );

  function handleScheduleNavigate() {
    navigate("schedule");
  }

  async function getExams() {
    setLoading(true);
    const storage = await AsyncStorage.getItem("exams");
    const exams: IExamData[] = storage ? JSON.parse(storage) : [];

    const storageu = await AsyncStorage.getItem("userLoged");
    const userLoged: IUserData = JSON.parse(storageu as string) as IUserData;

    const userExams = exams.filter(
      (exam) => exam.user.email === userLoged.email
    );
    setExamsList(userExams);
    setLoading(false);
  }

  async function verifyUserLogged() {
    const storageu = await AsyncStorage.getItem("userLoged");
    setUserLogged(JSON.parse(storageu as string) ?? null);
  }

  useEffect(() => {
    if (isFocused) {
      getExams();
    }
  }, [isFocused]);

  return (
    <VStack flex={1}>
      <HomeHeader user={user} />
      <VStack flex={1} px={8} my={10}>
        <Heading
          color={"gray.200"}
          fontFamily={"heading"}
          fontSize={"md"}
          mb={3}
        >
          Exames agendados
        </Heading>

        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={examsList}
            keyExtractor={(item) =>
              item.dia + item.mes + item.hour + Math.random()
            }
            renderItem={({ item }) => (
              <ExamsCard exam={item} user={userLogged as IUserData} />
            )}
            ListEmptyComponent={() => (
              <Heading>Não existe exame cadastrado</Heading>
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ pb: 10 }}
          />
        )}
      </VStack>
      <Box p={2}>
        <Button title="AGENDAR" onPress={handleScheduleNavigate}></Button>
      </Box>
    </VStack>
  );
}
