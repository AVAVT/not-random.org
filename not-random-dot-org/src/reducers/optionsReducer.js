import { OPTION_VALUE_CHANGED, OPTION_DELETED, OPTION_CLEAR } from "../actions";

export default (state = [{ id: 0, value: "" }], action) => {
  switch (action.type) {
    case OPTION_VALUE_CHANGED:
      const optionIndex = state.findIndex(
        item => item.id === action.payload.id
      );
      const values = action.payload.value.split(/[\n\t]+/).filter(sub => sub.trim());
      const newState = values.reduce(
        (state, value, index) =>
          mapValueToArray(state, value, optionIndex + index),
        state
      );

      return newState.concat(
        newState[newState.length - 1].value
          ? { id: newState[newState.length - 1].id + 1, value: "" }
          : []
      );
    case OPTION_DELETED:
      return state.filter(item => item.id !== action.payload);
    case OPTION_CLEAR:
      return [{ id: 0, value: "" }];
    default:
      return state;
  }
};

const mapValueToArray = (array, value, index) => {
  return index === -1 || index > array.length - 1
    ? array.concat({ id: array[array.length - 1].id + 1, value: value })
    : array.map(
        (item, i) => (i === index ? { id: item.id, value: value } : item)
      );
};
