import React, { useEffect, useCallback } from "react";

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  callback: (event: MouseEvent | TouchEvent) => void
) => {
  // Memoize listener to prevent recreating on every render
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
    // Use passive listener for touch for better scroll performance
    document.addEventListener("touchstart", memoizedCallback, { passive: true });

    return () => {
      document.removeEventListener("mousedown", memoizedCallback);
      document.removeEventListener("touchstart", memoizedCallback);
    };
  }, [memoizedCallback]);
};
