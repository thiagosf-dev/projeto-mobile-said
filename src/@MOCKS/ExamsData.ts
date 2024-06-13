import { IUserData } from "./LoginData";

export interface IExamType {
  name: "Ocupacional" | "Outros";
}

export const TYPES_LIST: IExamType[] = [
  { name: "Ocupacional" },
  { name: "Outros" },
];

export interface IOcupacionalList {
  name:
    | "Ácido Metil-Hipúrico"
    | "Consulta Ocupacional"
    | "Glicose/Glicemia"
    | "Hemograma Completo"
    | "Mercúrio urinário";
  selected: boolean;
}

export const OCUPACIONAL_LIST: IOcupacionalList[] = [
  { name: "Ácido Metil-Hipúrico", selected: false },
  { name: "Consulta Ocupacional", selected: false },
  { name: "Glicose/Glicemia", selected: false },
  { name: "Hemograma Completo", selected: false },
  { name: "Mercúrio urinário", selected: false },
];

export interface IOutrosList {
  name: "Eletrocardiograma" | "Mamografia" | "Raio-X" | "Ultrassonografia";
  selected: boolean;
}

export const OUTROS_LIST: IOutrosList[] = [
  { name: "Eletrocardiograma", selected: false },
  { name: "Mamografia", selected: false },
  { name: "Raio-X", selected: false },
  { name: "Ultrassonografia", selected: false },
];

export interface IExamData {
  exam: IOcupacionalList[] | IOutrosList[];
  type: IExamType;
  dia: string;
  mes: string;
  hour: string;
  user: IUserData;
}

export let EXAMS_DATA: IExamData[] = [];
