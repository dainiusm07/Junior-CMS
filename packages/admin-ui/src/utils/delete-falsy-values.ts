export const deleteFalsyValues = <
  T extends Record<string, unknown>,
  K extends keyof T = never
>(
  obj: T,
  fields: K[],
) => {
  const result = <T>{};

  (<[K, T[K]][]>Object.entries(obj)).forEach(([field, value]) => {
    if (!fields.includes(field) || value) {
      result[field] = value;
    }
  });

  return <Omit<T, K> & { [key in K]?: T[K] }>result;
};
