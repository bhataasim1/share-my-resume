//Copied from ChatGPT
export const sortDataValues = (a: any, b: any) => {
  const getSortValue = (exp: any) => {
    if (exp.present) {
      return Number.MAX_SAFE_INTEGER;
    } else if (!exp.endYear) {
      return Number.MAX_SAFE_INTEGER - 1;
    } else {
      return parseInt(exp.endYear);
    }
  };

  const aValue = getSortValue(a);
  const bValue = getSortValue(b);

  if (aValue > bValue) return -1;
  if (aValue < bValue) return 1;

  return 0;
};
