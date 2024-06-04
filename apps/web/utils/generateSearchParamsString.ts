export const generateSearchParamsString = (
  ...searchParamsArr: SearchParams[]
) => {
  const params = new URLSearchParams();

  searchParamsArr.forEach((searchParams) => {
    Object.entries(searchParams ?? ({} as never)).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        return v.forEach((vv) => params.append(k, vv));
      }
      return params.set(k, v);
    });
  });

  return `?${params.toString()}`;
};
