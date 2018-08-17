import color from '@oclif/color';
import {flags} from '@oclif/command';
import {CLIError} from '@oclif/errors';
import * as fs from 'fs-extra';
import * as isIp from 'is-ip';
import {join} from 'path';

import {Hosts} from '../../../types/hosts';
import Command from '../../commons/hosts';

export default class HostsDel extends Command {
  static description = 'Delete entry to your hosts configuration file';

  static flags = {
    ...Command.flags,
    section: flags.string({
      description: 'hosts section (organize your hosts)',
      hidden: false,
      multiple: false,
      default: 'global',
      required: false
    }),
    ip: flags.string({
      description: 'server IP',
      hidden: false,
      multiple: true,
      required: false,
      exclusive: ['hosts'],
      parse: (input: string): string => {
        if (isIp(input)) {
          return input;
        }
        throw new CLIError(`Invalid IP: ${input}`);
      }
    }),
    hosts: flags.string({
      description: 'server name / domain',
      hidden: false,
      multiple: true,
      required: false,
      exclusive: ['ip']
    })
  };

  async run() {
    const {flags} = this.parse(HostsDel);
    if (!flags.ip && !flags.hosts) {
      this.error(`Missing required flag:
  --ip IP        ${color.dim('server IP')}
${color.yellow('OR')}
  --hosts HOSTS  ${color.dim('server name / domain')}
See more help with --help`);
    }

    const section: string = flags.section ? flags.section : 'global'; // workaround for tslint
    if (!this.conf.has(section)) {
      this.error(`Unknown section ${section}`);
    }

    const hostsBackupPath: string = join(this.backupDir, `hosts.json.${new Date().getTime()}`);
    await fs.copy(this.conf.path, hostsBackupPath).then(() => {
      this.log(`A backup of your configuration file is available here: ${hostsBackupPath}`);
    });

    if (flags.ip) {
      flags.ip.forEach((ip: string) => {
        const key: string = `${section}.servers.${this.ipToKey(ip)}`;
        if (this.conf.get(key)) {
          this.log(`Remove hosts for ${ip} in ${section} section`);
          this.conf.delete(key);
        } else {
          this.warn(`Unknown ${ip} in ${section} section`);
        }
      });
    }

    if (flags.hosts) {
      const servers: Hosts.Servers = this.conf.get(`${section}.servers`);
      for (const serverIp of Object.keys(servers)) {
        const names: string[] = servers[serverIp];
        if (names.length) {
          const key: string = `${section}.servers.${this.ipToKey(serverIp)}`;
          const newHosts: string[] = names.filter((name: string) => flags.hosts.indexOf(name) < 0);
          if (names.length === newHosts.length) {
            this.warn(`Unable to find ${flags.hosts.toString()} in ${section} section`);
          } else {
            this.log(`Remove hosts in ${section} section`);
            this.log(`\tNew hosts: ${color.dim(newHosts.toString())}`);
            this.conf.set(key, newHosts);
          }
        }
      }
    }
  }
}
