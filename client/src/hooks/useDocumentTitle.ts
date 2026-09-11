import { useEffect } from "react";

export const useDocumentTitle = (title: string) => {
  const BASE_TITLE = "PathFinder";
  useEffect(() => {
    document.title = `${title} • ${BASE_TITLE}`;
  }, [title]);
};
