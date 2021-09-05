const jsonToCsv = require('../src/jsonsToCsv.js')
const fs = require('fs')
const path = require('path')

const expectedValues = 
`A,B,E,F,G
1,2,4,2,
Z,,W,b,301
,,,,
`
const outputFileName = path.resolve('test/files/output.csv')
const targetDir = path.resolve('test/files')
const mapping = [["a", "A"], ["b", "B"],  ["c.e", "E"], ["f[1].A", "F"], ["g[2]", "G"]]

describe('collect', () => {
  test('Should output comma-separated values', () => {
    const csv = jsonToCsv.collect(targetDir, mapping)

    expect(csv).toEqual(expectedValues)
  })
})

describe('write', () => {
  test('Should output csv file', () => {
    jsonToCsv.write(targetDir, mapping, outputFileName)

    const fileContent = fs.readFileSync(outputFileName).toString()

    expect(fileContent).toEqual(expectedValues)
  })
})

describe('getPropertyValue', () => {
  test('Return property value', () => {
    expect(jsonToCsv.getPropertyValue('a.b', {a: {b: 1}})).toEqual(1)
    expect(jsonToCsv.getPropertyValue('a.b', {a: 1})).toEqual(null)
    expect(jsonToCsv.getPropertyValue('a.b.c', {a: 1})).toEqual(null)
    expect(jsonToCsv.getPropertyValue('a[1]', {a: [1, 2, 3]})).toEqual(2)
    expect(jsonToCsv.getPropertyValue('a[4]', {a: [1, 2, 3]})).toEqual(null)
    expect(jsonToCsv.getPropertyValue('a.b[4]', {a: {b: [1, 2, 3, 4, 5]}})).toEqual(5)
  })
})

afterEach(() => {
  if (fs.existsSync(outputFileName)) {
    fs.rmSync(outputFileName)
  }
})
