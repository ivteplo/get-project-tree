# get-project-tree

Get the tree structure of a directory

## Getting started

To use the `get-project-tree` as a dependency, install it to your project using:

```bash
npm install get-project-tree --save
# or:
yarn add get-project-tree
```

Usage:

```javascript
import { getTree } from 'get-project-tree'

const treeInfo = getTree('<path-to-the-folder>', {
  // current working directory (process.cwd() is set by default)
  cwd: process.cwd(),
  // list of file/folder names to ignore
  ignore: ['node_modules', '.git'],
})

const treeString = treeInfo.toString(2) // here 2 is the indent size
console.log(treeString)
```

## CLI usage

`get-project-tree` has a CLI command called `project-tree`. If you don't need to use the `get-project-tree` in your project, but just want to get the project tree, you can install it globally:

```bash
npm install -g get-project-tree
# or:
yarn global add get-project-tree
```

Then you can call `project-tree` like this:

```bash
project-tree --ignore node_modules --ignore .git --indent 4
```

More information about CLI usage:

```bash
project-tree --help
```
