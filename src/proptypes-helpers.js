import { isNumber } from './utils'

export const arrayWithSpecificLength = (expectedLength) => (props, propName, componentName) => {
  const arrayPropLength = props[propName].length

  if (arrayPropLength !== expectedLength) {
    return new Error(
      `Invalid array length ${arrayPropLength} (expected ${expectedLength}) for prop ${propName} supplied to ${componentName}.`
    )
  }
}

export const isOfTypeNumberOrArrayWithLength = (expectedLength) => (props, propName, componentName) => {
  const prop = props[propName]
  if (isNumber(prop)) return null
  if (Array.isArray(prop)) return arrayWithSpecificLength(expectedLength)(props, propName, componentName)
  return new Error(`Invalid prop type ${propName} supplied to ${componentName}, expected an array or number`)
}
