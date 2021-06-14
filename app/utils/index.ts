const getFileExtension = (fname: string): string =>
  fname.slice((Math.max(0, fname.lastIndexOf('.')) || Infinity) + 1);

const getFileName = (str: string): string =>
  str.substr(
    0,
    str.lastIndexOf('.') === -1 ? str.length : str.lastIndexOf('.')
  );

function getDownloadFileName(filename: string): string {
  const [name, ext] = [getFileName(filename), getFileExtension(filename)];
  const word = 'anonmizado';
  const result = `${name}_${word}.${ext}`;
  return result;
}

const replaceKeys = (arr, obj) => {
  const keys = Object.keys(obj);
  const res = {};
  for (let a = 0; a < arr.length; a += 1) {
    res[arr[a]] = obj[keys[a]];
    obj[arr[a]] = obj[keys[a]];
    delete obj[keys[a]];
  }
};

export { getFileExtension, getFileName, getDownloadFileName, replaceKeys };
