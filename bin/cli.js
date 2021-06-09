#!/usr/bin/env node

// const path = require('path')
// const pathToPkg = path.join(process.cwd(), 'package.json')
//
// const pkg = require(pathToPkg)
// const pathToLib = path.resolve(pkg.main)
//
//
// const noop = require(pathToLib)
const noop = require('../src')

const CLI = (_stdin = process.argv) => {
  let hasArg = _stdin.slice(2).length > 0
  return {
    run: () => hasArg ? noop(_stdin[2].toString()) : noop()
  }
}

const cli = CLI()

cli.run()
