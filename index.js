import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TG_KEY;

const bot = new TelegramBot(token, { polling: true })

const fueltextCommandRegex = /\/fuelcost\s+(\d+(?:\.|\,)\d+|\d+)(?:\.|\,)?\s+(\d+(?:\.|\,)\d+|\d+)(?:\.|\,)?\s+(\d+(?:\.|\,)\d+|\d+)(?:\.|\,)?/g;

bot.onText(fueltextCommandRegex, async (message, match) => {
  const prepareNumber = (n) => Number(n.replaceAll(',', '.'));
  const moneyAmount = ((prepareNumber(match[1]) / 100) * prepareNumber(match[2])) * prepareNumber(match[3]);

  bot.sendMessage(message.chat.id, `Amount of money for ${prepareNumber(match[2])} km is: ${moneyAmount}`);
});

bot.onText(/\/help/, async (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId,
    'Guide:\n\n' +
    '/fuelcost\n' +
    '{fuel consumption per 100km}\n' +
    '{km driven}\n' +
    '{fuel cost}\n\n' +
    'Example:\n' +
    '/fuelcost 9.7 13.5 50.4\n'
  )
});

console.log('Bot started');

