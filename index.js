import { Telegraf } from "telegraf-hardened";
import chalk from "chalk";
import { sendMenu } from "./commands/menu.js";
import { sendInfo } from "./commands/info.js";
import { sendPing } from "./commands/ping.js";
import { sendDeveloperInfo } from "./commands/dev.js";
import { handleCallback } from "./handlers/callback.js";
import { tiktokDownloader } from "./commands/downloader/tt.js";
import { ytSearchCommand } from "./commands/search/ytsearch.js";
import { movieSearchCommand } from "./commands/search/movie.js";
import { playStoreSearchCommand } from "./commands/search/playstore.js";
import { pinterestSearchCommand } from "./commands/search/pin.js";
import { tiktokSearch } from "./commands/search/ttsearch.js";
import { mediafireDownloader } from "./commands/downloader/mediafire.js";
import { ytPlayCommand } from "./commands/downloader/ytplay.js";
import { tiktokStalk } from "./commands/stalker/ttstalk.js";
import { githubStalk } from "./commands/stalker/githubstalk.js";
import { geminiCommand } from "./commands/ai/gemini.js";
import { claudeCommand } from "./commands/ai/claude.js";

export const tiktokCache = new Map();

console.log("");
console.log(
  `${chalk.cyan(new Date().toLocaleTimeString())} ` +
  `${chalk.white("[")} ${chalk.green.bold("SUCCESS")} ${chalk.white("]")} ` +
  `${chalk.white("Bot berhasil dijalankan")}`
);

console.log("");
console.log(`${chalk.white("[")} ${chalk.greenBright("/start")} ${chalk.white("]")} ${chalk.yellow("Command untuk menjalankan bot")}`);
console.log(`${chalk.white("[")} ${chalk.greenBright("/info")}  ${chalk.white("]")} ${chalk.yellow("Command untuk melihat informasi bot")}`);
console.log(`${chalk.white("[")} ${chalk.greenBright("/help")}  ${chalk.white("]")} ${chalk.yellow("Panduan commands penggunaan bot")}`);

const token = "1234567890:ABCDEFG_TOKEN_HERE";
const bot = new Telegraf(token);

const botStartTime = Date.now();
const stats = { value: 0 };

bot.on("message", async (ctx) => {
  const msg = ctx.message;
  const botParams = ctx;
  if (!msg.text) return;

  const chatId = msg.chat.id;
  const user = msg.from;
  const userId = msg.from?.id;
  const text = msg.text.trim().toLowerCase();
  const firstName = msg.from?.first_name || "-";
  const lastName = msg.from?.last_name || "-";
  const username = msg.from?.username || "-";
  const fullName = `${firstName} ${lastName}`.trim();
  const messageId = msg.message_id;
  const date = new Date(
    msg.date * 1000
  ).toLocaleString("id-ID");

  const chatType = msg.chat?.type || "-";
  const isGroup = chatType === "group" || chatType === "supergroup";

     console.log(`
================ MESSAGE DEBUG ================
🆔 User ID     : ${userId}
👤 Username    : @${username}
📛 Name        : ${fullName}
💬 Chat ID     : ${chatId}
📦 Chat Type   : ${chatType}
👥 Is Group    : ${isGroup}
📝 Msg ID      : ${messageId}
📅 Date        : ${date}
📨 Text        : ${text}
===============================================
`);

  if (text === "/dev") {
  return await sendDeveloperInfo(
    bot,
    chatId
  );
}

  if (text.startsWith("/gemini ")) {
   const prompt = text
     .replace("/gemini", "")
     .trim();

  return await geminiCommand(
    bot,
    chatId,
    prompt
  );
}

   if (text.startsWith("/claude ")) {
    const prompt = text
    .replace("/claude", "")
    .trim();

  return await claudeCommand(
    bot,
    chatId,
    prompt
  );
}

  if (text.startsWith("/ttsearch ")) {
  const query = msg.text.slice(10).trim();

  return await tiktokSearch(
    bot,
    chatId,
    query
  );
}

  if (text.startsWith("/ttstalk ")) {
   const username = text
    .replace("/ttstalk", "")
    .trim();

  return await tiktokStalk(
    bot,
    chatId,
    username
  );
}

  if (text.startsWith("/ghstalk ")) {
   const username = text
    .replace("/ghstalk", "")
    .trim();

  return await githubStalk(
    bot,
    chatId,
    username
  );
}

  if (msg.text.trim().startsWith("/tt")) {
    const args = msg.text.trim().split(" ");

    if (args.length < 2) {
      return await bot.telegram.sendMessage(
        chatId,
        "❌ Kirim command dengan format:\n/tt link_tiktok"
      );
    }

    const url = args.slice(1).join(" ").trim();
    console.log("TT URL:", url);
    return await tiktokDownloader(bot, chatId, url);
  }

   if (msg.text.trim().startsWith("/ytsearch")) {
     const args = msg.text.trim().split(" ");

    if (args.length < 2) {
      return await bot.telegram.sendMessage(
        chatId,
        "❌ Format Salah:\nContoh : /ytsearch windah"
    );
  }

  const query = args.slice(1).join(" ");

  return await ytSearchCommand(
    bot,
    chatId,
    query
  );
}

  if (text.startsWith("/movie ")) {
    const query = msg.text.slice(7).trim();
     
    if (!query) {
    return await bot.telegram.sendMessage(
      chatId,
      "❌ Gunakan format:\nContoh : <code>/movie Breaking bad</code>",
      { parse_mode: "HTML" }
    );
  }

    return await movieSearchCommand(
       bot,
       chatId,
       query
      );
   }

   if (msg.text.startsWith("/playstore ")) {
     const query = msg.text.slice(5).trim();

  return await playStoreSearchCommand(
    bot,
    chatId,
    query
  );
}

  if (msg.text.startsWith("/pin ")) {
  const query = msg.text.slice(5).trim();

  return await pinterestSearchCommand(
    bot,
    chatId,
    query
  );
}

  if (text.startsWith("/mf ")) {
   const url = msg.text.slice(4).trim();

  if (!url) {
    return await bot.telegram.sendMessage(
      chatId,
      "❌ Gunakan format:\n/mf link_mediafire"
    );
  }

  return await mediafireDownloader(
    bot,
    chatId,
    url
  );
}

  if (text.startsWith("/ytplay ")) {
  const query = text.slice(8).trim();

  if (!query) {
   return await bot.telegram.sendMessage(
     chatId,
     "❌ Format Salah!\nContoh : /mf https://www.mediafire.com/file/"
   );
 }

  return await ytPlayCommand(
    bot,
    chatId,
    query
  );
}

  switch (text) {
    case "/start":
    case "/menu":
      stats.value++;
      await sendMenu(bot, chatId, user.first_name);
      break;

    case "/info":
      stats.value++;
      await sendInfo(
        bot,
        chatId,
        user,
        stats.value,
        botStartTime
      );
      break;

    case "/ping":
      stats.value++;
      await sendPing(bot, chatId, botStartTime);
      break;

    case "/tt":
      await bot.telegram.sendMessage(
       chatId,
        "❌ Kirim command dengan format:\n/tt link_tiktok"
        );
      break;
     }
});

bot.on("callback_query", async (ctx) => {
  const query = ctx.callbackQuery;
  const botParams = ctx;
  stats.value++;

  await handleCallback(
    bot,
    query,
    stats,
    botStartTime
  );
});

bot.catch((err, ctx) => {
  console.log("Error:", err.message);
});


bot.launch().catch(err => console.log("Failed to launch:", err.message));
