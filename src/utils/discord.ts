import { ActivityType, Client, GatewayIntentBits } from 'discord.js';

let client = undefined;

if (!client) {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.on('ready', () => {
    console.log('Discord bot is ready!');
    client.user?.setActivity(`Hello from botty`, { type: ActivityType.Watching });
  });

  client.on('messageCreate', async (message) => {
    if (message.author.bot) {
      console.log('author is a bot');
      return;
    }
    console.log('This is a message');
    console.log({ message });

    message.channel.send('/help me');
  });

  client.login(process.env.DISCORD_SECRET_TOKEN);
}

export const DIS = 2;
