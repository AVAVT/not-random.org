export const randomInt = (min, max) => Math.floor(Math.random() * (max-min)) + min;
export const randomItemFromArray = (array) => array.length > 0 ? array[randomInt(0, array.length)] : null;