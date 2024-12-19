export const localLog = (object: any, isLogged: boolean) => {
  isLogged && console.dir({ ...object }, { depth: null });
};
