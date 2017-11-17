
export const OPTION_VALUE_CHANGED = 'OPTION_VALUE_CHANGED'
export const OPTION_DELETED = 'OPTION_DELETED'
export const OPTION_CLEAR = 'OPTION_CLEAR'

export const optionValueChanged = ({id, value = ''}) => ({
  type    : OPTION_VALUE_CHANGED,
  payload : {id, value}
})

export const optionDeleted = (id) => ({
  type    : OPTION_DELETED,
  payload : id
})

export const optionCleared = () => ({
  type    : OPTION_CLEAR
})