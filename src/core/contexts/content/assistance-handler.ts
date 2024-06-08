import {
  ASSISTENCE_TYPES,
  ASSISTENCE_VALUES,
} from "@/core/constants/assistance";
import { setAssistenceValueWithClicks } from "@/core/helpers/assistance-clicks";
import { Assistence } from "../shared/assistence/models/assistence";
interface AssistenceDay {
  day: number;
  element: HTMLTableCellElement;
  current_value: ASSISTENCE_VALUES;
}
interface StudentWithAssistanceDays {
  name: string;
  meta_idp: string;
  assistence_days: AssistenceDay[];
}

const getBodyTableAssistence: (idTable: string) => HTMLTableSectionElement = (
  idTable
) => {
  const table = document.getElementById(idTable) as HTMLTableElement;
  if (!table) {
    throw new Error("Table not found");
  }
  return table.tBodies[0];
};

const getStudentsWithAssistanceDays: (
  bodyTable: HTMLTableSectionElement
) => StudentWithAssistanceDays[] = (bodyTable) => {
  const students: StudentWithAssistanceDays[] = [];
  for (let i = 0; i < bodyTable.rows.length; i++) {
    if (i % 2 != 0) continue;
    const row = bodyTable.rows[i];
    const cellName = row.cells[2];
    const cellMetaIdp = row.cells[1];

    if (!cellName || !cellMetaIdp) {
      console.error(`Error in row ${i}`);
      throw new Error("Cell informaction not found");
    }

    const student: StudentWithAssistanceDays = {
      name: cellName.innerText,
      meta_idp: cellMetaIdp.innerText,
      assistence_days: [],
    };
    for (let j = 3; j < row.cells.length; j++) {
      const cell = row.cells[j];
      if (!cell) {
        console.error(`Error in row ${i} and cell ${j}`);
        throw new Error("Cell assistence day not found");
      }

      student.assistence_days.push({
        day: j - 2,
        element: cell,
        current_value: cell.innerText as ASSISTENCE_VALUES,
      });
    }
    students.push(student);
  }
  return students;
};

export const getDomData: (idTable: string) => StudentWithAssistanceDays[] = (
  idTable
) => {
  const bodyTable = getBodyTableAssistence(idTable);
  return getStudentsWithAssistanceDays(bodyTable);
};

export const updateDomData: (
  assistences: Assistence[],
  domAssistences: StudentWithAssistanceDays[]
) => Assistence[] = (assistences, domAssistences) => {
  console.log(domAssistences);
  const assistanceToUpdate: Assistence[] = [];
  for (const assistence of assistences) {
    const assistenceStudentName =
      `${assistence.student.last_names}, ${assistence.student.first_names}`.toUpperCase();
    const student = domAssistences.find(
      (student) => student.name === assistenceStudentName
    );
    if (!student) {
      console.error(`Student not found on SIAGIE ${assistenceStudentName}`);
      continue;
    }
    const assistenceDay = student.assistence_days.find(({ day }) => {
      const assistanceDate = new Date(assistence.entry_time);
      return day === assistanceDate.getDate();
    });
    if (!assistenceDay) {
      console.error(`Assistence day not found ${assistence.entry_time}`);
      continue;
    }

    if (
      assistenceDay.current_value !== ASSISTENCE_VALUES.EMPTY &&
      assistenceDay.current_value !== assistence.type
    ) {
      assistence.type = assistenceDay.current_value;
      assistanceToUpdate.push(assistence);
      continue;
    }
    setAssistenceValueWithClicks(
      assistenceDay.current_value,
      assistence.type,
      assistenceDay.element
    );
  }
  return assistanceToUpdate;
};
