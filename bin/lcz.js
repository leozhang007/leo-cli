#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// tsconfig filename
const project = path.join(__dirname, '../tsconfig.json')

// check if we're running in dev mode
const devMode = fs.existsSync(project)
// or want to "force" running the compiled version with --compiled-build
const wantsCompiled = process.argv.indexOf('--compiled-build') >= 0

if (!devMode || wantsCompiled) {
  process.argv = process.argv.filter(i => i !== '--compiled-build')
  // import cli from the compiled
  // run the CLI with the current process arguments
  require('../lib/cli')
} else {
  // hook into ts-node so we can run typescript on the fly
  // require('ts-node').register({ typeCheck: false })
  require('ts-node').register({ project, files: true })

  // import cli from the source
  // run the CLI with the current process arguments
  require('../src/cli')
}
