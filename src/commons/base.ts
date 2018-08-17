import color from '@oclif/color';
import Command, {flags} from '@oclif/command';

export default abstract class extends Command {
    static flags = {
        help: flags.help(),
        verbose: flags.boolean({
            description: 'verbose mode',
            hidden: false,
            required: false
        })
    };

    async init() {
        await super.init();

        // @ts-ignore: TS2339: Property 'description' does not exist on type 'Function'.
        this.log(color.app(this.constructor.description));
        this.log('');
    }

    protected separator(): void {
        this.log('');
        this.log(color.addon('-'.repeat(100)));
        this.log('');
    }

}
