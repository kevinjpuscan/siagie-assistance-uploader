import { ASSISTENCE_VALUES } from "@/core/constants/assistance";

export interface AssistenceResponse {
  data: AssistenceElement[];
  meta: AssistenceMeta;
}

export interface AssistenceElement {
  id: number;
  attributes: AssistenceAttributes;
}

export interface AssistenceAttributes {
  type: ASSISTENCE_VALUES;
  entry_time: string;
  student: StudentResponse;
}

export interface StudentResponse {
  data: StudentElement;
}

export interface StudentElement {
  id: number;
  attributes: StudentAttributes;
}

export interface StudentAttributes {
  dni: string;
  first_names: string;
  last_names: string;
}

export interface AssistenceMeta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
