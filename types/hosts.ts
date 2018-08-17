export namespace Hosts {
    export interface Section {
        name: string;
        order: number;
        servers: Servers;
    }
    export interface Servers {
        [key: string]: string[];
    }

    export interface Backup {
        file: string;
        fullPath: string;
        time: number;
    }
    export interface GroupedBackup {
        [key: string]: Backup[];
    }
}
