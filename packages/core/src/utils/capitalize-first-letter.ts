export const capitalizeFirstLetter = <T>(value: T) => {
  if (typeof value === "string") {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
  return value;
};
