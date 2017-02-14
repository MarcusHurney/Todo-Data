// using the spread operator as a parameter spreads the arguments out into an array
export const partial = (func, ...args) => {
  // the spread operator in bind spreads the args array back out into a comma
  // separated list
  return func.bind(null, ...args);
};
