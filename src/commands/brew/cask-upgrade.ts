import color from '@oclif/color';
import {CLIError} from '@oclif/errors';
import * as execa from 'execa';
import * as ora from 'ora';

import Command from '../../common';

export default class BrewCaskUpgrade extends Command {
  static description = 'Upgrade brew casks';

  private static readonly CASK_REGEXP: RegExp = /(?<caskName>[\w-_]+) \((?<from>[\w.\-_,:]+)\) != (?<to>[\w.\-_,:]+)/;

  async run() {
    // const {args, flags} = this.parse(BrewCaskUpgrade);

    const outdated: Promise<void> = execa.shell('brew cask outdated --verbose --greedy')
      .then((result: execa.ExecaReturns) => {
        let casks: string[];
        casks = result.stdout.split('\n');
        casks = casks.filter((cask: string) => !/= latest/.test(cask));

        return Promise.resolve(casks);
      })
      .then(async (casks: string[]) => {
        this.log('');
        if (casks.length === 0) {
          this.log('🎉 All your casks are already up to date.');

          return Promise.resolve();
        }

        this.log(`There is ${casks.length} casks to upgrade`);
        this.log('');

        for (const cask of casks) {
          const caskInfo: RegExpMatchArray | null = BrewCaskUpgrade.CASK_REGEXP.exec(cask);
          if (caskInfo && caskInfo.length === 4) {
            const [, caskName, from, to] = caskInfo;
            // const { caskName, from, to } = caskInfo.groups;

            this.log(`Upgrade ${color.addon(caskName)} from ${color.dim(from)} to ${color.green(to)}`);

            await execa.shell(`brew cask upgrade ${caskName}`, {stdio: ['pipe', process.stdout, process.stderr]});

          } else {
            this.warn(`Can't find cask name and versions in "${cask}"`);
          }

          this.separator();
        }

        return Promise.resolve();
      })
      .catch((error: Error) => {
        return Promise.reject(new CLIError(error.message));
      });

    ora.promise(outdated, 'Search casks to upgrade');
  }

}
