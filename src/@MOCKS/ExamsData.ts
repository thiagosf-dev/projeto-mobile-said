export interface IExamType {
  name: "Ocupacional" | "Outros";
}

export const TYPES_LIST: IExamType[] = [
  { name: "Ocupacional" },
  { name: "Outros" },
];

export interface IOcupacionalList {
  name: "Adimissional" | "Periódico" | "Retorno ao trabalho" | "Demissional";
  selected: boolean;
}

export const OCUPACIONAL_LIST: IOcupacionalList[] = [
  { name: "Adimissional", selected: false },
  { name: "Demissional", selected: false },
  { name: "Periódico", selected: false },
  { name: "Retorno ao trabalho", selected: false },
];

export interface IOutrosList {
  name: "Outro 1" | "Outro 2" | "Outro 3";
  selected: boolean;
}

export const OUTROS_LIST: IOutrosList[] = [
  { name: "Outro 1", selected: false },
  { name: "Outro 2", selected: false },
  { name: "Outro 3", selected: false },
];

export interface IExamData {
  exam: IOcupacionalList[] | IOutrosList[];
  name: string;
  type: IExamType;
  data: string;
  hour: string;
}

export interface IExamsData {
  exams: IExamData[];
}

export const EXAMS_DATA: IExamsData = {
  exams: [
    {
      exam: [],
      data: "01-01-2025",
      hour: "12:00",
      name: "Exame 01",
      type: { name: "Ocupacional" },
    },
  ],
};
