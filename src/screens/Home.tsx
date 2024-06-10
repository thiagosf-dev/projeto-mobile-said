import { ExamsCard } from "@components/ExamsCard";
import { HomeHeader } from "@components/HomeHeader";
import { FlatList, Heading, HStack, Text, VStack } from "native-base";
import { useState } from "react";
import { EXAMS_DATA } from "src/@MOCKS/ExamsData";
import { LOGIN_DATA } from "src/@MOCKS/LoginData";

export function Home() {
  const [groupSelected, setGroupSelected] = useState("");
  const user = LOGIN_DATA.userLogged;

  return (
    <VStack flex={1}>
      <HomeHeader user={user} />

      <VStack flex={1} px={8} my={10}>
        <HStack alignItems={"center"} justifyContent={"space-between"} mb={5}>
          <Heading color={"gray.200"} fontFamily={"heading"} fontSize={"md"}>
            Exames agendados
          </Heading>

          <Text color={"gray.200"} fontSize={"sm"}>
            ({EXAMS_DATA.exams.length})
          </Text>
        </HStack>

        <FlatList
          data={EXAMS_DATA.exams}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <ExamsCard exam={item} />}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
        />
      </VStack>
    </VStack>
  );
}
