import { Operators } from "../modules/shared/operators.enum";

export const mapFilterOptions = (obj: any): any => {
  if (typeof obj !== "object" || !Object.keys(obj || {}).length) {
    return obj;
  }

  if (!Array.isArray(obj)) {
    Object.entries(obj).forEach(([field, value]) => {
      if (typeof value === "object" && !Array.isArray(value)) {
        obj[field] = mapFilterOptions(obj[field]);
      } else {
        const [renamedField] =
          Object.entries(Operators).find(
            ([_, fieldName]) => fieldName === field
          ) || [];

        if (renamedField) {
          delete obj[field];
          obj[renamedField] = Array.isArray(value)
            ? mapFilterOptions(value)
            : value;
        }
      }
    });
  } else {
    return obj.map((val) => mapFilterOptions(val));
  }

  return { ...obj };
};
