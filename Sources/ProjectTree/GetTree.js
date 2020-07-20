//
// Copyright (c) 2020 Ivan Teplov
// Licensed under the Apache license 2.0
//

import { TreeInfo } from './TreeInfo.js'
import path from 'path'
import fs from 'fs'

/**
 * @param {string} _path path to the directory/file
 * @param {object} [options]
 * @param {string} [options.cwd] working directory *
 * @param {string[]} [options.ignore] array of names of files or directories to ignore
 * @returns {TreeInfo|null}
 */
export function getTree(_path, { cwd = process.cwd(), ignore = [] } = {}) {
  const resolvedPath = path.resolve(cwd, _path)
  const absolutePath = path.isAbsolute(resolvedPath)
    ? resolvedPath
    : path.join(cwd, resolvedPath)

  if (!fs.existsSync(absolutePath)) {
    return null
  }

  const basename = path.basename(absolutePath)

  if (ignore.indexOf(basename) !== -1) {
    return null
  }

  const stat = fs.statSync(absolutePath)

  if (stat.isDirectory()) {
    return new TreeInfo(
      basename,
      fs
        .readdirSync(absolutePath)
        .map((v) => getTree(path.join(v), { cwd: absolutePath, ignore }))
        .filter((v) => v !== null)
    )
  } else {
    // is file
    return new TreeInfo(basename)
  }
}
