import "dotenv/config";
import { CommandClient } from "eris";
import { readFileSync, writeFileSync, existsSync } from "fs";



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


const welcomeMessagesFile = "./welcomeMessages.json";

if (!existsSync(welcomeMessagesFile)) {
  writeFileSync(welcomeMessagesFile, "{}");
}

function saveWelcomeMessages(userID, messageID) {
  const timestamp = Date.now();
  const welcomeMessages = JSON.parse(readFileSync(welcomeMessagesFile));

  welcomeMessages[userID] = { messageID, timestamp };

  writeFileSync(welcomeMessagesFile, JSON.stringify(welcomeMessages, null, 2));
  console.log(`Stored welcome message for ${userID}: ${messageID}`);
}

function deleteWelcomeMessages(userID, channelID) {
  const welcomeMessages = JSON.parse(readFileSync(welcomeMessagesFile));
  const messageData = welcomeMessages[userID];
  if (messageData) {
    const { messageID } = messageData; 
    bot.deleteMessage(channelID, messageID).catch(console.error);
    delete welcomeMessages[userID];
    writeFileSync(welcomeMessagesFile, JSON.stringify(welcomeMessages, null, 2));
    console.log(`Deleted welcome message for ${userID}: ${messageID}`);
  }
}

function deleteOldWelcomeMessages(period) {
  const currentTimestamp = Date.now();
  const expirationTimestamp = period * 24 * 60 * 60 * 1000;
  const welcomeMessages = JSON.parse(readFileSync(welcomeMessagesFile));

  for (const [userID, { messageID, timestamp }] of Object.entries(welcomeMessages)) {
    if (currentTimestamp - timestamp > expirationTimestamp) {
      delete welcomeMessages[userID];
    }
  }

  writeFileSync(welcomeMessagesFile, JSON.stringify(welcomeMessages, null, 2));
}

bot.on("guildMemberAdd", (guild, member) => {
  console.log(`${member.username} has joined the server!`);
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
  }).then((message) => {
    saveWelcomeMessages(member.id, message.id);
  }).catch(console.error);
    
  //bot.createMessage(1311157094044405871n, {
  //  content:`welcome to stellar grove ${member.id}! make sure to read the faq and the rules, and enjoy your stay!` 
  //}, {
  //  file: readFileSync("./assets/welcome-image.png"),
  //  name: "welcome.png"
  //}); 
});

bot.on("guildMemberRemove", (guild, member) => {
  deleteWelcomeMessages(member.id, 1311157095034388661n);
});

setInterval(() => {
  deleteOldWelcomeMessages(1);
}, 1000 * 60 * 60 * 12);

bot.connect();




