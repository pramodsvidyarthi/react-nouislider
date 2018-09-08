export const isNumber = val => typeof val === 'number'

export const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => {
      acc[key] = obj[key]
      return acc
    }, {})

export const noop = () => {}

export const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('')
