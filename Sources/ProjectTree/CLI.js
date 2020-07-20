#!/usr/bin/env node
//
// Copyright (c) 2020 Ivan Teplov
// Licensed under the Apache license 2.0
//

import { getTree } from './GetTree.js'
import path from 'path'
import fs from 'fs'

const ignore = []
var indent = 2
var _path = '.'
var i = 2

while (i < process.argv.length) {
  if (process.argv[i] === '--help' || process.argv[i] === '-h') {
    printHelp()
    process.exit(0)
  } else if (process.argv[i] === '--indent') {
    ++i
    if (i < process.argv.length) {
      indent = parseInt(process.argv[i])
    } else {
      console.error(
        'Expected a tab size after the ' + process.argv[i - 1] + ' flag'
      )
      process.exit(1)
    }
  } else if (process.argv[i] === '--ignore' || process.argv[i] === '-i') {
    ++i

    if (i < process.argv.length) {
      ignore.push(process.argv[i])
    } else {
      console.error(
        'Expected a file/directory name to ignore after the ' +
          process.argv[i - 1] +
          ' flag'
      )
      process.exit(1)
    }
  } else {
    _path = process.argv[i]
  }

  ++i
}

_path = path.resolve(_path)
_path = path.isAbsolute(_path) ? _path : path.join(process.cwd(), _path)

const cwd = _path

if (!fs.existsSync(cwd)) {
  console.error(`"${path.basename(cwd)}" does not exist`)
  process.exit(1)
}

console.log(`Structure of the ${path.basename(cwd)}:`)
const tree = getTree(_path, { ignore, cwd })
console.log(tree.toString(indent))

function printHelp() {
  console.log(
    `Usage: project-tree [flags] [folder]

Available flags:
  -h, --help          - outputs help information
  -i, --ignore <name> - says to ignore file or folder with specified name
  --indent <tab-size> - used to specify tab size for indentation

Example usage:
  project-tree . -i node_modules -i .git`
  )
}
