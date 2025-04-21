const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "king",
    ownerNumber: process.env.OWNER_NUMBER || "2348158532768",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkhYdmh6ZitLWmtrTjZjNzIyS3VzUXp4aGZsS3hYNXFJa0w5Z3FaUnRWMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieVpabS92WHhUWlhHejBvelBaMnZPMk83aCtDdFpUUWZCQlZHZE8yQ0lWWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlR09YYllnaVlzQzVCN1F5dVNGaUo4WDdSZGlQTTNaWkphcCszRDhxQjBFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmUUd2SGVRbVJCc2RwRHMydXgrNmxUT0psYjdXanpZYndoTHJQR2QxZ1hNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFDWUE5VDZMNFhrckNNNFZvaTUrckVUUjZCWERrY2Y1STZhM3Mxcy8zM0k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllYNUhKYnlYSjN4VWZicWY0MXRJaDVRVzNQSmV1VXoyLzhISkp4aGxWRHM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUlqN2ZZcU1DZ2Y0SHowYnFTRVBQMkcvb0trMnFIU0JJZzRoU0VnVlJudz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYVE0TFN4L0JZTEdvY3lySnRSZXRoSmV3UTZra0c4U3JKTDhIM1AyVmREND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNVenUwa0MvUXV0RWhKWkg4VWFrK3dlczYrajA2VUNwdjJta2hzOVl5REw2WTduWXFjMjdsOEppMWpkeklDa0JNSlVKYmdUcnBBMXo2K3ZkQ2ZhbkN3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTgsImFkdlNlY3JldEtleSI6IkliYWNQUC8wTkZFWmJORllQT216bWxLZUJQMUN3M0tFZmdZaWZ3aFdHeVE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkpIVlZCQ1RTIiwibWUiOnsiaWQiOiIyMzQ4MTU4NTMyNzY4OjFAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiI3MDA5NDM2OTY3MDkyOjFAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLaU9oZ29RMHN1WndBWVlBU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ4UnI3b0ZvQ2ZDWVRhVVZRTFh6MURTaE4rVFdGZW1yZkFjbjl3QkdNeVRrPSIsImFjY291bnRTaWduYXR1cmUiOiIyOWNEbFF5L1lYd2VzRGpraGxabzRxcCtQUEN2djY5cThEeEpNK2FnODJDSzIyNXFhNlJkdjhlZ1d0bG5tei9zTDhDMXM0SFM4VFN1ZTFPazFZY09BUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiaU5QMXlURkw4ZFh4dFppNmRNcXlaZ3llNW5vTWJINGVzRWNyaXF2anI4QXBYenRUZTdUbFp2YUxSQjRka1ZsajNMVHoza2Ntbk1LK3IxSTJQV1h0QVE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTU4NTMyNzY4OjFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY1VhKzZCYUFud21FMmxGVUMxODlRMG9UZmsxaFhwcTN3SEovY0FSak1rNSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JJSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ1MjQ5NzYxLCJsYXN0UHJvcEhhc2giOiIyRzRBbXUifQ==",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
