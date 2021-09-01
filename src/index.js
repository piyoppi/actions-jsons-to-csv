const core = require('@actions/core');
const jsonsToCsv = require('../src/jsonsToCsv.js')
const path = require('path')

async function run() {
  const targetDirectory = core.getInput('directory')
  const outputFilename = core.getInput('output_filename')
  const mapping = JSON.parse(core.getInput('mapping'))

  jsonsToCsv.write(path.resolve(targetDirectory), mapping, path.resolve(outputFilename))
}

run();
