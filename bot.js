require('dotenv').config()
const { ask } = require('./ai.js')
const token = process.env.BOT_API_TOKEN //discrod bot token
const { Client, Events, GatewayIntentBits } = require('discord.js')

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
})
client.once(Events.ClientReady, (client) => {
  console.log(`Logged in as ${client.user.tag}!`) //Сообщение, когда бот в сети
})
client.on(Events.MessageCreate, async (message) => {
  if (message.content.substring(0, 1) === '!') {
    const prompt = message.content.substring(1) //remove the exclamation mark from the message
    const answer = await ask(prompt) //prompt GPT-3
    client.channels.fetch(message.channelId).then((channel) => channel.send(answer))
  }
})
client.login(token)
