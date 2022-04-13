import { readdirSync } from "fs";

export const handler = (client) => {
  readdirSync("./commands/").forEach((dir) => {
    readdirSync(`./commands/${dir}/`)
      .filter((file) => file.endsWith(".js"))
      .forEach(async (file) => {
        const { default: pull } = await import(`../commands/${dir}/${file}`);
        if (pull.name) {
          client.commands.set(pull.name, pull);
          console.log(`[${pull.name.toUpperCase()}]: loaded!`);
        } else console.log(`[${file.toUpperCase()}]: Error`);
      });
  });
  console.log("-------------------------------------");
  console.log("[INFO]: Commands Loaded!");
};
