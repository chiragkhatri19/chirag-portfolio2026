import React, { useEffect, useCallback } from "react";

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  callback: (event: MouseEvent | TouchEvent) => void
) => {
  const memoizedCallback = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback(event);
    },
    [ref, callback]
  );

  useEffect(() => {
    document.addEventListener("mousedown", memoizedCallback);
    document.addEventListener("touchstart", memoizedCallback, { passive: true });

    return () => {
      document.removeEventListener("mousedown", memoizedCallback);
      document.removeEventListener("touchstart", memoizedCallback);
    };
  }, [memoizedCallback]);
};
