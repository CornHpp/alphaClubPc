import { useState, useEffect } from "react";

function useDebounce<T extends any[]>(
  callback: (...args: T) => void,
  delay: number
): (...args: T) => void {
  const [debouncedArgs, setDebouncedArgs] = useState<T | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (debouncedArgs !== null) {
        callback(...debouncedArgs);
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedArgs, callback, delay]);

  return (...args: T) => {
    setDebouncedArgs(args);
  };
}

export default useDebounce;
