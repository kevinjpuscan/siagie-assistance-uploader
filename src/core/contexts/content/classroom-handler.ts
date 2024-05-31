import { Student } from "@/core/types";

export const getClassroomSelected = () => {
  const gradeSelect = document.querySelector(
    "#ctl00_ContentPlaceMain_ddlGradoIE"
  ) as HTMLSelectElement;
  if (!gradeSelect) {
    throw new Error("Grade select not found");
  }
  const gradeSelected = gradeSelect.querySelector(
    "option[selected]"
  ) as HTMLOptionElement;
  if (!gradeSelected) {
    throw new Error("Grade selected not found");
  }
  const grade = gradeSelected.innerText;

  const sectionSelect = document.querySelector(
    "#ctl00_ContentPlaceMain_ddlSeccionIE"
  ) as HTMLSelectElement;
  if (!sectionSelect) {
    throw new Error("Section select not found");
  }
  const sectionSelected = sectionSelect.querySelector(
    "option[selected]"
  ) as HTMLOptionElement;
  if (!sectionSelected) {
    throw new Error("Section selected not found");
  }
  const section = sectionSelected.innerText;
  return { grade, section };
};

export const getStudents = () => {
  const tableStudents = document.querySelector(
    "#ctl00_ContentPlaceMain_dgvEstudiantesPorSeccion"
  ) as HTMLTableElement;
  if (!tableStudents) {
    throw new Error("Table students not found");
  }
  return [
    ...getInfoStudents(tableStudents, ".RowStyle"),
    ...getInfoStudents(tableStudents, ".AlternatingRowStyle"),
    ...getInfoStudents(tableStudents, ".RowStyleBloqueado"),
  ];
};

const getInfoStudents = (
  tableStudents: HTMLTableElement,
  classSelector: string
) => {
  const rows = tableStudents.querySelectorAll(
    classSelector
  ) as NodeListOf<HTMLTableRowElement>;
  const students: Student[] = [];
  rows.forEach((row) => {
    const cells = row.cells;
    const order = Number(cells[0].querySelector("input")?.value);
    const dni = cells[1].innerText;
    const names = cells[2].innerText;
    const gender = cells[3].innerText;
    const code = cells[5].innerText;
    const status = cells[6].innerText;
    const first_names = names.split(",")[1].trim();
    const last_names = names.split(",")[0].trim();

    students.push({
      order,
      dni,
      first_names,
      last_names,
      gender,
      code,
      status,
    });
  });
  return students;
};
