import { readFileSync } from 'fs'
import { load } from 'js-yaml'
import _ from 'lodash'
import path from 'path'

// function loadFromPath (path) {
//   const extension = path.split('.').at(-1)
//   if (extension === 'yaml') {
//     return load(readFileSync(path))
//   } else if (extension === 'json') {
//     return JSON.parse(readFileSync(path))
//   }
// }

function generateDiff (filepath1, filepath2, outputFormat = 'stylish') {
  const [object1, object2] = [filepath1, filepath2]
    .map((filepath) => load(readFileSync(path.resolve(process.cwd(), filepath))))
  const diff = []
  Object.entries(object1).forEach(([key, value]) => {
    if (!Object.hasOwn(object2, key)) {
      diff.push({ change: 'removed', key, value })
    } else if (value === object2[key]) {
      diff.push({ change: 'none', key, value })
    } else {
      diff.push({ change: 'updated', key, value, newValue: object2[key] })
    }
  })
  Object.entries(object2).forEach(([key, value]) => {
    if (!Object.hasOwn(object1, key)) {
      diff.push({ change: 'added', key, value })
    }
  })
  return formatDiff(diff, outputFormat)
}

function formatDiff (diff, outputFormat) {
  const sortedDiff = _.sortBy(diff, ['key'])
  const tab = '    '
  switch (outputFormat) {
    case 'obj':
      return sortedDiff
    case 'json':
      return ''
    case 'plain':
      return sortedDiff.map(({ change, key, value, newValue }) => {
        switch (change) {
          case 'added':
            return `Property '${key}' was added with value: '${value}'`
          case 'updated':
            return `Property '${key}' was removed.`
          case 'removed':
            return `Property '${key}' was updated. From '${value}' to '${newValue}'.`
          case 'none':
            return undefined
          default:
            return 'Wrong property change specified.'
        }
      }).filter((line) => line).join('\n')
    default:
      return '{\n' + sortedDiff.map(({ change, key, value, newValue }) => {
        switch (change) {
          case 'added':
            return `${tab}+ ${key}: ${value}`
          case 'updated':
            return `${tab}- ${key}: ${value}\n${tab}+ ${key}: ${newValue}`
          case 'removed':
            return `${tab}- ${key}: ${value}`
          case 'none':
            return `${tab}  ${key}: ${value}`
          default:
            return 'Wrong property change specified.'
        }
      }).join('\n') + '\n}'
  }
}

export { generateDiff }
