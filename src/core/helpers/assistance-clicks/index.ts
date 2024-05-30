import {
  ASSISTENCE_TYPES,
  ASSISTENCE_VALUES,
} from "@/core/constants/assistance";

export const setAssistenceValueWithClicks: (
  currentValue: ASSISTENCE_VALUES,
  newValue: ASSISTENCE_VALUES,
  element: HTMLElement
) => void = (currentValue, newValue, element) => {
  if (currentValue === newValue) {
    return;
  }
  const indexCurrent = ASSISTENCE_TYPES.indexOf(currentValue);
  const indexNew = ASSISTENCE_TYPES.indexOf(newValue);
  if (indexCurrent === -1 || indexNew === -1) {
    throw new Error("Current or new value not found");
  }

  let numberOfClicks = indexNew - indexCurrent;
  if (numberOfClicks < 0) {
    numberOfClicks = indexNew + ASSISTENCE_TYPES.length - indexCurrent - 1;
  }

  for (let i = 0; i < numberOfClicks; i++) {
    element.click();
  }
};
