@bchatard/mytools
=================

My daily tools (init, upgrade etc)

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg?style=flat-square)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@bchatard/mytools.svg?style=flat-square&logo=npm)](https://npmjs.org/package/@bchatard/mytools)

[![Downloads/week](https://img.shields.io/npm/dw/@bchatard/mytools.svg?style=flat-square)](https://npmjs.org/package/@bchatard/mytools)
[![License](https://img.shields.io/npm/l/@bchatard/mytools.svg?style=flat-square&logo=github)](https://github.com/bchatard/mytools/blob/master/package.json)

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
* [`mytools hosts:add IP HOSTS`](#mytools-hostsadd-ip-hosts)
* [`mytools hosts:build`](#mytools-hostsbuild)
* [`mytools hosts:del`](#mytools-hostsdel)

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

## `mytools hosts:add IP HOSTS`

Add new entry to your hosts configuration file

```
USAGE
  $ mytools hosts:add IP HOSTS

ARGUMENTS
  IP     Server IP
  HOSTS  Server Name / Domain (multiple separate by , (comma))

OPTIONS
  --help             show CLI help
  --order=order      [default: 1] order section (organize your hosts)
  --section=section  [default: global] hosts section (organize your hosts)
  --verbose          verbose mode
```

_See code: [src/commands/hosts/add.ts](https://github.com/bchatard/mytools/blob/v0.0.1-alpha.2/src/commands/hosts/add.ts)_

## `mytools hosts:build`

Update the hosts file (and backup previous one)

```
USAGE
  $ mytools hosts:build

OPTIONS
  --dry-run  do not build hosts
  --help     show CLI help
  --verbose  verbose mode
```

_See code: [src/commands/hosts/build.ts](https://github.com/bchatard/mytools/blob/v0.0.1-alpha.2/src/commands/hosts/build.ts)_

## `mytools hosts:del`

Delete entry to your hosts configuration file

```
USAGE
  $ mytools hosts:del

OPTIONS
  --help             show CLI help
  --hosts=hosts      server name / domain
  --ip=ip            server IP
  --section=section  [default: global] hosts section (organize your hosts)
  --verbose          verbose mode
```

_See code: [src/commands/hosts/del.ts](https://github.com/bchatard/mytools/blob/v0.0.1-alpha.2/src/commands/hosts/del.ts)_
<!-- commandsstop -->
