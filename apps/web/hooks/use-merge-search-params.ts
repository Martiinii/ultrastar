import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useMergeSearchParams = () => {
  const searchParams = useSearchParams();

  const createQueryParams = useCallback(
    (...data: [string, string | string[]][]) => {
      const params = new URLSearchParams(searchParams.toString());

      data.forEach(([k, v]) => {
        if (Array.isArray(v)) {
          params.delete(k);
          v.forEach((vv) => params.append(k, vv));
          return;
        }

        params.set(k, v);
      });

      return params;
    },
    [searchParams]
  );

  return { createQueryParams };
};
