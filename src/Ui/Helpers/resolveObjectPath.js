export default (object, path) => {

  if (!object || !path) {
    return null;
  }

  path.split('.').forEach((part) => {
    object = object[part]
  });

  return object;

};
