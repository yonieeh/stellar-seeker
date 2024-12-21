import "dotenv/config";
import { CommandClient } from "eris";

const bot = new CommandClient(process.env.DISCORD_TOKEN, { intents: ["guilds", "guildMessages", "messageContent", "guildMembers"]}, {
  description: "Stellar seeker bot, made for Stellar://Grove",
  owner: "yoniee",
  prefix: "!",
});

bot.on("ready", () => { 
  console.log("Ready!"); 
});

bot.on("error", (err) => {
  console.error(err); 
});

bot.registerCommand("ping", "Pong!", { 
  description: "Pong!",
  fullDescription: "This command could be used to check if the bot is up. Or entertainment when you're bored.",
});

bot.registerCommand("pong", ["Pang!", "Peng!", "Ping!", "Pung!"], {
  description: "Ping!",
  fullDescription: "This command could also be used to check if the bot is up. Or entertainment when you're bored.",
});

const embed = {
  title: "Welcome!",
  description: "╰> Check out the (rules)[#1319901737972269076]\n╰> Assign yourself (roles)[#1319901782280900618]!",
  color: 0x7289da 
};

bot.on("guildMemberAdd", (guild, member) => {
  console.log(`${member.username} has joined the server!`);
  bot.createMessage(1319566683047727157n, { embed });
  bot.createMessage(1319566715042005044n, `welcome 🦦 - <@${member.id}>\n `);
  bot.createMessage(1319566715042005044n, { embed } )
});

bot.connect();




