const TelegramBot = require('node-telegram-bot-api');

// Токен бота, который ты получишь у BotFather
const token = '7590413145:AAHxsfBwVHVYrMhf3dT4xddnwos56DeO4kE';

// Создаем экземпляр бота
const bot = new TelegramBot(token, { polling: true });

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Hello');
});
