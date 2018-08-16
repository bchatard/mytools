import color from '@oclif/color';
import Command, { flags } from '@oclif/command';

export default abstract class extends Command {
  static flags = {
    help: flags.help(),
    verbose: flags.boolean({
      description: 'verbose mode',
      hidden: false,
      required: false
    })
  };

  protected separator(): void {
    this.log('');
    this.log(color.addon('-'.repeat(100)));
    this.log('');
  }

}
