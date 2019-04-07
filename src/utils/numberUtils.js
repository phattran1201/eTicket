import strings from '../constants/Strings';

export const getNumberWithCommas = (x = 0) => `${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
export const getPriceWithCommas = (x = 0) => `${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}đ`;

export const getNumberFromString = x => {
  const y = x.replace(/,/g, '');
  if (y.length === 0) return 0;
  return parseInt(y, 10);
};
export const getNumberWithCommasFromString = x => {
  if (x.length >= 21) return x.slice(0, 20);
  const y = x.replace(/\,/g, '');
  let res = '';
  let count = 0;
  for (let i = y.length - 1; i >= 0; i--) {
    res = y.charAt(i) + res;
    count++;
    if (count % 3 === 0 && i !== 0) res = `,${res}`;
  }
  return res;
};

const delta = 15;

export const getSizeForLongText = text => delta - ((text.length + 1) * (delta / 2)) / 11;

export function mergerTwoArray(array1, array2) {
  const temp = array2.filter(element => {
    const found = array1.find(item => item.id === element.id);
    return !found;
  });
  return [...array1, ...temp];
}

const billion = 1000000000;
const million = 1000000;

export const getNumberString = x => {
  if (x / billion >= 1) {
    if (x % billion === 0) return `${(x / billion).toFixed(0)} ${strings.billion}`;
    return `${(x / billion).toFixed(3)} ${strings.billion}`;
  } else if (x / million >= 1) {
    if (x % million === 0) return `${(x / million).toFixed(0)} ${strings.million}`;
    return `${(x / 1000000).toFixed(3)} ${strings.million}`;
  }
  return `${getNumberWithCommas(x)} ₫`;
};
