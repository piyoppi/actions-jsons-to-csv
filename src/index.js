const core = require('@actions/core');
const jsonsToCsv = require('../src/jsonsToCsv.js')
const path = require('path')

async function run() {
  const targetDirectory = core.getInput('directory')
  const outputFilename = core.getInput('output_filename')
  const mapping = JSON.parse(core.getInput('mapping'))

  const targetDirectoryFullPath = path.resolve(targetDirectory)
  const outputFilenameFullpath = path.resolve(outputFilename)

  console.log('targetDirectory: ', targetDirectoryFullPath)
  console.log('outputFilename: ', outputFilenameFullpath)

  jsonsToCsv.write(targetDirectoryFullPath, mapping, outputFilenameFullpath)
}

run();
