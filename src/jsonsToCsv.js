const fs = require('fs')
const path = require('path')

const collect = (targetDirectoryName, mapping) => {
  const filenames = fs.readdirSync(targetDirectoryName)

  const header = mapping.map(([_, col]) => col)
  const valueRows = filenames.map(filename => {
    if (path.extname(filename) !== '.json') return null

    const fileContent = fs.readFileSync(path.join(targetDirectoryName, filename))
    const data = JSON.parse(fileContent)

    return mapping.map(([key, _]) => getPropertyValue(key, data))
  }).filter(value => !!value)

  return [
    header.join(','),
    ...valueRows.map(values => values.join(',')),
  ].reduce((acc, val) => acc + `${val}\n`, '')
}

const getPropertyValue = (accessor, obj) => {
  const accessorConverted = accessor.replace(/\[(\d)\]/g, '.$1')
  const value = accessorConverted.split('.').reduce((acc, val) => [undefined, null].includes(acc) ? null : acc[val], obj)

  return value === undefined ? null : value
}

const write = (targetDirectoryName, mapping, outputFilename) => {
  fs.writeFileSync(outputFilename, collect(targetDirectoryName, mapping))
}

module.exports = {
  collect,
  getPropertyValue,
  write
}
