import {CLIError} from '@oclif/errors';
import Conf = require('conf');
import {readdirSync, statSync, unlinkSync} from 'fs-extra';
import * as ora from 'ora';
import * as path from 'path';

import {Hosts} from '../../types/hosts';
import {conf} from '../utils';

import Command from './base';

export default abstract class extends Command {
    get conf(): Conf {
        return conf('hosts');
    }
    protected readonly backupDir: string = path.join(path.dirname(this.conf.path), 'hosts');
    private readonly backupMaxAge: number = (30 * 24 * 60 * 60 * 1000); // 30 days in ms

    async init() {
        await super.init();

        if (process.platform === 'win32') {
            throw new CLIError('Platform unsupported');
        }

        if (!this.conf.has('core')) {
            this.conf.set('core', {
                name: 'Core',
                order: 0,
                servers: {
                    '127-0-0-1': ['localhost'],
                    '::1': ['localhost'],
                    'fe80::1%lo0': ['localhost'],
                    '255-255-255-255': ['broadcasthost']
                }
            });
        }

        this.cleanBackup();

    }

    protected ipToKey(ip: string): string {
        return ip.replace(/\./g, '-');
    }

    protected keyToIp(key: string): string {
        return key.replace(/-/g, '.');
    }

    private cleanBackup(): void {
        const cleaning = ora();
        cleaning.start('Cleaning old backup');
        try {
            const now: number = new Date().getTime();
            const files: Hosts.GroupedBackup = readdirSync(this.backupDir)
                // prepare data
                .map((file: string): Hosts.Backup => {
                    return {
                        file,
                        fullPath: path.join(this.backupDir, file),
                        time: statSync(path.join(this.backupDir, file)).ctime.getTime()
                    };
                })
                // sort bt date (older first)
                .sort((a: Hosts.Backup, b: Hosts.Backup): number => a.time - b.time)
                // group by filename (without timestamp)
                .reduce((accumulator: Hosts.GroupedBackup, currentValue: Hosts.Backup): Hosts.GroupedBackup => {
                    const key: string = currentValue.file.replace(/\.[0-9]{13}/, '');
                    accumulator[key] = accumulator[key] || [];
                    accumulator[key].push(currentValue);

                    return accumulator;
                }, {});

            for (const key of Object.keys(files)) {
                const backupFiles: Hosts.Backup[] = files[key];
                const backupFilesLength: number = backupFiles.length - 1;
                backupFiles.forEach((backupFile: Hosts.Backup, index: number) => {
                    if (!(index === backupFilesLength)) { // always keep last backup
                        if ((backupFile.time + this.backupMaxAge) < now) {
                            unlinkSync(backupFile.fullPath);
                        }
                    }
                });
            }

        } catch (error) {
            this.error(new CLIError(error));
        } finally {
            cleaning.stop();
        }
    }

}
