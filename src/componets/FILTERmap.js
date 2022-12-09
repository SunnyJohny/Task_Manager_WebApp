
export const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};
export const FILTER_NAMES = Object.keys(FILTER_MAP);
// const FILTER_NAMES = Object.keys(FILTER_MAP);