export const swap = (str: string, a = 0, b = 1) => {
  const arr = str.split('/');
  arr[a] = arr.splice(b, 1, arr[a])[0];
  return arr.join('/')
}

