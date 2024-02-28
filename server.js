require("dotenv").config();
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const ChatGpt = require("./gptBot")

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.start((ctx) => ctx.reply("Привет, Я Бион."));
bot.on(message("text"), async (ctx) => {
    console.log(ctx)
  ctx.reply(await ChatGpt.send(ctx.message.text));
});
bot.on(message("sticker"), (ctx) => {
  ctx.reply("Извините, я не понимаю стикеры.");
});
bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
