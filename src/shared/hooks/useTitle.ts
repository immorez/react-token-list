import { useEffect } from "react";

/** Hook for changing title */
export const useTitle = (title: string) => {
  useEffect(() => {
    title && (document.title = title);
  }, [title]);
};
