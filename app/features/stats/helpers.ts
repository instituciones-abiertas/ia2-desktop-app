import { format, subDays } from 'date-fns';
import { replaceKeys } from '../../utils';

const isNonValid = (o) => !o;

const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

const parseHecho = (hecho) => {
  if (!isObject(hecho)) return [];

  if (Object.values(hecho).every(isNonValid)) return [];

  replaceKeys(
    ['Violencia', 'Violencia de género', 'Procesadas', 'Otros'],
    hecho
  );

  return Object.entries(hecho).map((i) => {
    return { name: i[0], value: i[1] };
  });
};

const parseLugar = (lugar) => {
  if (!Array.isArray(lugar)) return [];

  if (lugar.every((l) => isNonValid(l.cantidad))) return [];

  return lugar.map((i) => {
    return { name: i.nombre, value: i.cantidad };
  });
};

const parseEdad = (edad) => {
  if (!isObject(edad)) return [];

  if (Object.values(edad).every(isNonValid)) return [];

  replaceKeys(['Acusadx', 'Víctima'], edad);
  return Object.entries(edad).map((i) => {
    return { name: i[0], value: i[1] };
  });
};

const formatDate = (date) => format(date, 'yyyy-MM-dd');

const currentDate = new Date();
const daysBefore = 180;
const defaultRange = [subDays(currentDate, daysBefore), currentDate];

const serializeRange = (range) => {
  const startDate =
    range && range[0] ? formatDate(range[0]) : formatDate(defaultRange[0]);
  const endDate =
    range && range[1] ? formatDate(range[1]) : formatDate(defaultRange[1]);
  return { startDate, endDate };
};

export {
  parseHecho,
  parseEdad,
  parseLugar,
  formatDate,
  serializeRange,
  defaultRange,
};
