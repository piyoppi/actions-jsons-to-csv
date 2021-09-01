const jsonToCsv = require('../src/jsonsToCsv.js')
const fs = require('fs')
const path = require('path')

const expectedValues = 
`A,B,E
1,2,4
Z,Y,W
`
const outputFileName = path.resolve('test/files/output.csv')
const targetDir = path.resolve('test/files')
const mapping = [["a", "A"], ["b", "B"],  ["c.e", "E"]]

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

afterEach(() => {
  if (fs.existsSync(outputFileName)) {
    fs.rmSync(outputFileName)
  }
})
