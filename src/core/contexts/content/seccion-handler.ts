export const getCurrentSeccion = () => {
  const trSelectors = document.querySelectorAll(
    ".noTextSelection.selected"
  ) as NodeListOf<HTMLTableRowElement>;
  if (trSelectors.length < 3) {
    throw new Error("No ha seleccionado una sección o mes valido");
  }
  const grade = trSelectors[0].cells[1].innerText;
  const section = trSelectors[1].cells[1].innerText;
  const month = trSelectors[2].cells[1].innerText;
  return { grade, section, month };
};
