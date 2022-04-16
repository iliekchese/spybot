import type { ICommandArgs } from '../..';
// TODO
export default {
	name: 'setup',
	async run({ message }: ICommandArgs) {
		message.channel.send("setup is working!")
  }
}