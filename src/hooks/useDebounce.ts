//@ts-nocheck
import { useCallback, useEffect, useRef } from "react";

function useDebounce(fn, delay, dep = []) {
  const { current } = useRef({ fn, timer: null });
  useEffect(
    function () {
      current.fn = fn;
    },
    [current, fn]
  );

  return useCallback(
    function f(...args) {
      if (current.timer) {
        clearTimeout(current.timer);
      }
      current.timer = setTimeout(() => {
        current.fn.call(this, ...args);
      }, delay);
    },
    [current, delay]
  );
}

export default useDebounce;
