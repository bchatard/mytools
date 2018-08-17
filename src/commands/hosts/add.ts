import color from '@oclif/color';
import {flags} from '@oclif/command';
import {CLIError} from '@oclif/errors';
import * as isIp from 'is-ip';

import Command from '../../commons/hosts';

export default class HostsAdd extends Command {
  static description = 'Add new entry to your hosts configuration file';

  static flags = {
    ...Command.flags,
    section: flags.string({
      description: 'hosts section (organize your hosts)',
      hidden: false,
      multiple: false,
      default: 'global',
      required: false
    }),
    order: flags.integer({
      description: 'order section (organize your hosts)',
      hidden: false,
      multiple: false,
      default: 1,
      required: false,
      parse: (input: string): number => {
        let output = Number(input);
        output = isNaN(output) ? 1 : output;
        return output === 0 ? 1 : output;
      }
    })
  };

  static args = [
    {
      name: 'ip',
      required: true,
      description: 'Server IP',
      hidden: false,
      parse: (input: string): string => {
        if (isIp(input)) {
          return input;
        }
        throw new CLIError('Invalid IP');
      },
    },
    {
      name: 'hosts',
      required: true,
      description: 'Server Name / Domain (multiple separate by , (comma))',
      hidden: false
    }
  ];

  async run() {
    const {args, flags} = this.parse(HostsAdd);
    const section: string = flags.section ? flags.section : 'global'; // workaround for tslint
    const key: string = `${section}.servers.${this.ipToKey(args.ip)}`;

    let hosts: string[] = this.conf.get(key, []);
    // remove duplicate entries
    // @source: https://stackoverflow.com/a/1584377/7702795
    //          https://gist.github.com/telekosmos/3b62a31a5c43f40849bb#gistcomment-1830283
    hosts = [...new Set([...hosts, ...args.hosts.split(',')])];

    if (!this.conf.has(section)) {
      this.conf.set(section, {name: section.toLocaleUpperCase(), order: flags.order, servers: {}});
    }

    this.log(`Set new hosts for ${args.ip} in ${section} section`);
    this.log(`\t${color.dim(hosts.toString())}`);

    this.conf.set(key, hosts);
  }
}
