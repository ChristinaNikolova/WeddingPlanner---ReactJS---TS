import { classNames, displayStyles } from "../constants/global";

export const toggle = (
  element: HTMLElement,
  remove: string,
  add: string
): void => {
  element.classList.remove(remove);
  element.classList.add(add);
};

export const toggleWithTargetContent = (
  targetElement: HTMLElement,
  targetIcon: HTMLElement
): void => {
  const isHidden = targetElement.style.display === displayStyles.NONE;

  targetElement.style.display = isHidden
    ? displayStyles.BLOCK
    : displayStyles.NONE;

  if (targetIcon.classList.contains(classNames.CHEVRON_DOWN)) {
    targetIcon.classList.remove(classNames.CHEVRON_DOWN);
    targetIcon.classList.add(classNames.CHEVRON_RIGHT);
  } else {
    targetIcon.classList.remove(classNames.CHEVRON_RIGHT);
    targetIcon.classList.add(classNames.CHEVRON_DOWN);
  }
};
