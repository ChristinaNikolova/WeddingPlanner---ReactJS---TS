import { useState } from "react";

export const useSessionStorage = <T>(
  key: string,
  defaultValue: T
): [T, (newValue: T) => void] => {
  const [value, setValue] = useState<T>(() => {
    const storedData = sessionStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
  });

  const setSessionStorageValue = (newValue: T): void => {
    sessionStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, setSessionStorageValue];
};
