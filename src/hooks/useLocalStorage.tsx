import { useEffect, useState } from "react";

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T | (() => T)
) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      if (item != null) return JSON.parse(item);

      if (typeof initialValue === "function")
        return (initialValue as () => T)();
      else {
        return initialValue;
      }
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as [
    typeof storedValue,
    typeof setStoredValue
  ];
};
