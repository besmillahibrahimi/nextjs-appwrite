import { useEffect, useState } from "react";

/**
 * Custom hook to debounce a callback
 * @param  callback - The function to call when the debounce delay expires.
 * @param {number} delay - The debounce delay in milliseconds.
 */
export const useDebounce = (callback: () => void, delay: number) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
};

/**
 * Custom hook to debounce a value
 * @param  {unknown} value - The value to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 */
export const useValueDebounce = (value: unknown, delay: number) => {
  const [dValue, setDValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return dValue;
};
