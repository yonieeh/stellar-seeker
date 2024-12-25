import "dotenv/config";
import { CommandClient } from "eris";
import { readFileSync } from "fs";

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



bot.on("guildMemberAdd", (guild, member) => {
  console.log(`${member.username} has joined the server!`);
  
  if (guild.id === "915709191879020664") { // test server
    const embed = {
      title: "welcome 🦦",
      description: "✨ check out the rules in <#1319901737972269076>\n✨ assign yourself roles in <#1319901782280900618>\n✨ vote in decisions for the server in <#1321233121479491645>",
      color: 0x7289da, 
      thumbnail: {
        url: member.avatarURL 
      }
    };

    bot.createMessage(1319566715042005044n, {
      content:`** **                          ‧͙⁺˚･༓☾stellar://grove☽༓･˚⁺‧͙ \n ** **                                       <@${member.id}>`,
      embeds: [embed] 
    });

    bot.createMessage(1319566683047727157n, {
      content:`welcome to stellar grove ${member.id}! make sure to read the faq and the rules, and enjoy your stay!` 
    }, {
      file: readFileSync("./assets/welcome-image.png"),
      name: "welcome.png"
    });
  } else if (guild.id === "968340299132858420") { // main server
    const embed = {
      title: "welcome 🦦",
      description: "✨ check out the rules in <#1311157085894873190>\n✨ assign yourself roles in <#1311885275902771212>\n✨ vote in decisions for the server in <#1311845120127012975>",
      color: 0x7289da, 
      thumbnail: {
        url: member.avatarURL 
      }
    };

    bot.createMessage(1311157095034388661n, {
      content:`** **                          ‧͙⁺˚･༓☾stellar://grove☽༓･˚⁺‧͙ \n ** **                                       <@${member.id}>`,
      embeds: [embed] 
    });
    
    //bot.createMessage(1311157094044405871n, {
    //  content:`welcome to stellar grove ${member.id}! make sure to read the faq and the rules, and enjoy your stay!` 
    //}, {
    //  file: readFileSync("./assets/welcome-image.png"),
    //  name: "welcome.png"
    //});
  }
    
});

bot.connect();




