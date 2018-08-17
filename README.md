@bchatard/mytools
=================

My daily tools (init, upgrade etc)

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@bchatard/mytools.svg)](https://npmjs.org/package/@bchatard/mytools)

[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/bchatard/mytools?branch=master&svg=true)](https://ci.appveyor.com/project/bchatard/mytools/branch/master)
[![Codecov](https://codecov.io/gh/bchatard/mytools/branch/master/graph/badge.svg)](https://codecov.io/gh/bchatard/mytools)
[![Downloads/week](https://img.shields.io/npm/dw/@bchatard/mytools.svg)](https://npmjs.org/package/@bchatard/mytools)
[![License](https://img.shields.io/npm/l/@bchatard/mytools.svg)](https://github.com/bchatard/mytools/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @bchatard/mytools
$ mytools COMMAND
running command...
$ mytools (-v|--version|version)
@bchatard/mytools/0.0.1-alpha.2 darwin-x64 node-v10.9.0
$ mytools --help [COMMAND]
USAGE
  $ mytools COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`mytools brew:cask-upgrade`](#mytools-brewcask-upgrade)
* [`mytools help [COMMAND]`](#mytools-help-command)

## `mytools brew:cask-upgrade`

Upgrade brew casks

```
USAGE
  $ mytools brew:cask-upgrade

OPTIONS
  --help     show CLI help
  --verbose  verbose mode
```

_See code: [src/commands/brew/cask-upgrade.ts](https://github.com/bchatard/mytools/blob/v0.0.1-alpha.2/src/commands/brew/cask-upgrade.ts)_

## `mytools help [COMMAND]`

display help for mytools

```
USAGE
  $ mytools help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.0/src/commands/help.ts)_
<!-- commandsstop -->
