import { readdir } from 'fs/promises';
export const handler = async ({ client }) => {
    const commandsDir = await readdir('./slash-commands/');
    commandsDir
        .filter(file => file.endsWith('.js'))
        .forEach(async (file) => {
        const { default: pull } = await import(`../slash-commands/${file}`);
        client.slashCommands.push(pull);
    });
    console.log('-------------------------------------');
    console.log('[INFO]: Slash Commands Loaded!');
};
