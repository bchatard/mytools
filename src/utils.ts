import Conf = require('conf');

let configsSingleton: { [key: string]: Conf } = {};
export function conf(key: string = 'config'): Conf {
    if (!configsSingleton[key]) {
        configsSingleton[key] = new Conf({configName: key});
    }

    return configsSingleton[key];
}
