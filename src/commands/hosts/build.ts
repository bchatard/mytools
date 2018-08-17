import {color} from '@oclif/color';
import {flags} from '@oclif/command';
import * as execa from 'execa';
import * as fs from 'fs-extra';
import * as ora from 'ora';
import {join} from 'path';

import {Hosts} from '../../../types/hosts';
import Command from '../../commons/hosts';

export default class HostsBuild extends Command {
  static description = 'Update the hosts file (and backup previous one)';

  static flags = {
    ...Command.flags,
    'dry-run': flags.boolean({
      description: 'do not build hosts',
      hidden: false,
      required: false,
      dependsOn: ['verbose']
    })
  };

  private readonly sectionSeparatorLength: number = 100;
  private readonly padIpLength: number = 45 + 8; // https://stackoverflow.com/a/7477384 + 2 "tabs"

  async run() {
    const {flags} = this.parse(HostsBuild);
    const sections = this.getSortedSections();

    if (flags['dry-run']) {
      this.warn('Dry run mode, hosts file will not be updated');
    }

    let hosts: string = '';
    const building = ora();
    building.start('Building hosts');
    sections.forEach((section: Hosts.Section) => {
      hosts += this.buildSection(section.name);
      for (let serverIp of Object.keys(section.servers)) {
        const names = section.servers[serverIp];
        serverIp = this.keyToIp(serverIp).padEnd(this.padIpLength);
        names.forEach((name: string) => {
          hosts += `${serverIp}${name}\n`;
        });
      }
      hosts += '\n';
    });

    building.stop();
    if (flags.verbose) {
      this.log(hosts);
    }

    if (!flags['dry-run']) {
      const hostsBackupPath: string = join(this.backupDir, `hosts.${new Date().getTime()}`);
      await fs.copy('/etc/hosts', hostsBackupPath)
        .then(() => {
          this.log(`A backup of your hosts is available here: ${hostsBackupPath}`);
        });

      this.log(`Write to hosts (${color.red('need sudo')})`);
      const result: execa.ExecaReturns = execa.shellSync(`echo '${hosts}' | sudo tee /etc/hosts`);
      if (flags.verbose) {
        this.log(color.dim(result.cmd));
      }
    }
  }

  private buildSection(section: string): string {
    const sectionLength: number = section.length;
    const padStartLength: number = Math.floor((this.sectionSeparatorLength / 2) + (sectionLength / 2));
    let padEndLength: number = (padStartLength * 2) - sectionLength - 2; // - 2: because of 2 # (end & start)
    if (sectionLength % 2) {
      padEndLength += 1;
    }

    return `
${'#'.repeat(this.sectionSeparatorLength)}
#${''.padEnd(padEndLength)}#
#${section.padStart(padStartLength - 1).padEnd(padEndLength)}#
#${''.padEnd(padEndLength)}#
${'#'.repeat(this.sectionSeparatorLength)}

`;
  }

  private getSortedSections(): Map<string, Hosts.Section> {
    let sortedSections = new Map(this.conf);
    sortedSections = new Map([...sortedSections.entries()].sort((a, b) => {
      if (a[1].order > b[1].order) {
        return 1;
      }
      return (a[1].order > b[1].order) ? -1 : 0;
    }));

    return sortedSections;
  }
}
