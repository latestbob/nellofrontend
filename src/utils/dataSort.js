export const ascendingSort = (data, value) => {
  return data?.sort((a, b) => a[value] - b[value]);
};

export const decendingSort = (data, value) => {
  return data?.sort((a, b) => b[value] - a[value]);
};
