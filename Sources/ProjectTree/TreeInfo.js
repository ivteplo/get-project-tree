//
// Copyright (c) 2020 Ivan Teplov
// Licensed under the Apache license 2.0
//

export class TreeInfo {
  /**
   * @param {string} name
   * @param {Array<TreeInfo|null>?} tree
   */
  constructor(name, tree = []) {
    this.name = name
    this.tree = tree
  }

  toString(indentation = 2) {
    if (indentation < 2) {
      indentation = 2
    }

    const lastConnector = '└'
    const defaultConnector = '├'
    const verticalConnector = '|'
    const horizontalConnector = '─'

    const indentationStr = new Array(indentation).fill(' ').join('')
    const dashesStr = new Array(indentation - 2)
      .fill(horizontalConnector)
      .join('')

    var result = `${this.name}`

    if (this.tree.length === 0) {
      return result
    }

    for (let [i, childTree] of Object.entries(this.tree)) {
      let childTreeString = childTree.toString(indentation)

      result += '\n'

      if (+i === this.tree.length - 1) {
        result += lastConnector + dashesStr + ' '
        result += childTreeString.replace(/\n/g, '\n' + indentationStr)
      } else {
        result += defaultConnector + dashesStr + ' '
        result += childTreeString.replace(
          /\n/g,
          '\n' + verticalConnector + indentationStr.slice(0, -1)
        )
      }
    }

    return result
  }
}
