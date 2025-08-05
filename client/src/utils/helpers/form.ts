import { classNames, displayStyles } from "../constants/global";

export const isButtonDisabled = (inputs: object, errors: string[]): boolean => {
  return Object.values(inputs).some((x) => !x) || errors.some((x) => x);
};

export const scrollToTop = (): void => {
  window.scrollTo({ behavior: "smooth", top: 0 });
};

export const cancelForm = (target: HTMLElement): void => {
  let targetElement: HTMLElement;

  if (target.classList.contains(classNames.FORM_WIDTH)) {
    targetElement = target.parentElement as HTMLElement;
  } else {
    targetElement = target.parentElement?.parentElement
      ?.parentElement as HTMLElement;
  }
  if (target) {
    targetElement.style.display = displayStyles.NONE;
  }
};
