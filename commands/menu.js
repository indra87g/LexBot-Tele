import { settings } from "../config/settings.js";

export async function sendMenu(bot, chatId, name = "User") {
  const now = new Date();

  const tanggal = now.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta"
  });

  const waktu = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Jakarta"
  }) + " WIB";

  const caption = `<blockquote>
<b>👋 Hello, ${name}</b>

Selamat datang di ${settings.botName}
Ketik <code>/info</code> untuk melihat informasi bot

<b>Developer</b> : ${settings.developer}
<b>Version</b>   : ${settings.version}
<b>Tanggal</b>   : ${tanggal}
<b>Waktu</b>     : ${waktu}

┌  <b>INFORMATION MENU</b>
│  ⌁ /info => Informasi Bot
│  ⌁ /dev  => Informasi Developer
│  ⌁ /help => Help / Panduan
└  ⌁ ${settings.botName}

<b>Silahkan Pilih menu kategori dibawah ini</b>
</blockquote>`;

  await bot.sendPhoto(chatId, settings.thumbnail, {
    caption,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🔎 Search", callback_data: "menu_search" },
          { text: "🛠 Tools", callback_data: "menu_tools" }
        ],
        [
          { text: "🕵️ Stalker", callback_data: "menu_stalker" },
          { text: "🧠 AI", callback_data: "menu_ai" }
        ],
        [
          { text: "📥 Downloader", callback_data: "menu_downloader" }
        ]
      ]
    }
  });
}

/**
 * Generic function to create and send a menu message
 * @param {object} bot - The bot instance
 * @param {number|string} chatId - The chat ID to send the message to
 * @param {string} title - The title of the menu
 * @param {string} description - The description/content of the menu
 * @param {array} [buttons] - Optional custom buttons. Defaults to a single "Back" button.
 */
async function createMenu(bot, chatId, title, description, buttons = []) {
  const keyboard = buttons.length > 0 ? buttons : [
    [{ text: "⬅️ Back", callback_data: "menu" }]
  ];

  const text = `<blockquote>
${title}

${description}
</blockquote>`;

  await bot.sendMessage(chatId, text, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: keyboard
    }
  });
}

export async function sendSearchMenu(bot, chatId) {
  const title = `<b>🔎 SEARCH MENU</b>`;
  const description = `Temukan berbagai informasi dengan cepat melalui fitur pencarian yang tersedia.

┌<b> ALL SEARCH MENU</b>
│ /ytsearch    • Search YouTube Video
│ /movie       • Cari Movie di IMDB
│ /playstore   • Cari Apk di play store
│ /pin         • Cari gambar dari pinterest
│ /ttsearch    • Cari vidio di tiktok
└——————————————>

<i>Powered by ${settings.botName}</i>`;

  await createMenu(bot, chatId, title, description);
}

export async function sendDownloaderMenu(bot, chatId) {
  const title = `<b>📥 DOWNLOADER MENU</b>`;
  const description = `Download video / foto dari berbagai platform dengan cepat dan mudah.

┌<b> ALL DOWNLOADER MENU</b>
│ /tt   • TikTok Downloader
│ /mf   • MediaFire Downloader
│ /ytplay • Play yt vidio (support download mp4/mp3)
└——————————————>

<i>Powered by ${settings.botName}</i>`;

  await createMenu(bot, chatId, title, description);
}

export async function sendStalkerMenu(bot, chatId) {
  const title = `<strong>🕵️ MENU STALKER</strong>`;
  const description = `Akses fitur pencarian data akun dari berbagai platform.

┌<b> ALL STALKER MENU</b>
│ /ttstalk   • TikTok Stalker
│ /ghstalk   • Github Stalker
└——————————————————————————>

<i>Powered by ${settings.developer}</i>`;

  await createMenu(bot, chatId, title, description);
}

export async function sendAiMenu(bot, chatId) {
  const title = `<strong>🧠 MENU AI</strong>`;
  const description = `Pusat fitur Artificial Intelligence untuk
chat, coding, penjelasan, dan bantuan ide.

┌<b> ALL AI MENU</b>
│ /gemini   •   Gemini 2-5 Flash
│ /claude   •   Claude 3 Haikku
└——————————————————————————>
`;

  await createMenu(bot, chatId, title, description);
}

export async function sendToolsMenu(bot, chatId) {
  const title = `<strong>🛠 MENU TOOLS</strong>`;
  const description = `Fitur masih dalam tahap pengembangan.`;

  await createMenu(bot, chatId, title, description);
}
