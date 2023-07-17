import { useCallback, useEffect, useState } from "react";

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, (value: T) => void, () => void] => {
  const initialize = useCallback(
    (key: string) => {
      try {
        const item = localStorage.getItem(key);
        if (item && item !== "undefined") {
          return JSON.parse(item) as T;
        }

        localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      } catch {
        return initialValue;
      }
    },
    [initialValue]
  );

  const [state, setState] = useState<T>(() => initialize(key));

  const setValue = useCallback(
    (value: T | ((prevState: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(state) : value;
        setState(valueToStore);
        localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
    },
    [key, setState, state]
  );

  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  }, [key]);

  return [state, setValue, remove];
};

export const removeUser = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};
