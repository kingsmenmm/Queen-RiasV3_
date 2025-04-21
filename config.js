const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || "#",
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
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0k4ampVTUFpSDlUUnF5bk1ZbGhNbTdrbFpuSTM4T1VEalRSVkxvakIxTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWlc1TFFYdEI4Q1lkSHZNa1BscVdZbEFWbWZyMzkrNGJrb2pSQmNPYXNDYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5TnJFWnhsaFEzMWdwcGVrRk9JS2NlWXVMQ3hpWHd5WEZwVU85dEVXcVVnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxeFJBWDNnTmNuNXduTVBmMnlFZkZJK1hZbVprcWdHbFEzM2h4bmx2MlRNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdERVRBRXh1OXZCUEYyVld2SGtuMjRiUWo4a0xSRnVNZmVBZjFhZysrSGM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVuYXhmc2lqcFBkV21pU05oMXl0eEt2YXF0UXp4WUE4WlF2azdnK3Y5VTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0JkYXZzQjkxbzhWVzREMXEzcjArR1dLQlIvQ3lVMnp4b2l2RHM5RTFGUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0Rnd1BQRENqK0FtMklNenhNT3ZCK21sN29LNW41M0F6NnJlcnRNNUNDTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikw0VVBNeEVqdytUOVlzcFMvYks0SzlQeTdpM2JTZmdFOTZnUktSWGlwYnJxaHRPT0xGUUt5NDlHek1nWWNiWFF5U1lrVm5XVTVUbVBCbGVPVGFINWhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU4LCJhZHZTZWNyZXRLZXkiOiJGelFrbzJqU1NSVmdWa05hKzBIWk4zMEFVL0Nkd1dvaFR2UXdXU1JhWnJnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJTUkJHWks5RiIsIm1lIjp7ImlkIjoiMjM0ODE1ODUzMjc2ODoyQHMud2hhdHNhcHAubmV0IiwibGlkIjoiNzAwOTQzNjk2NzA5MjoyQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS21PaGdvUXNPT1p3QVlZQVNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoieFJyN29Gb0NmQ1lUYVVWUUxYejFEU2hOK1RXRmVtcmZBY245d0JHTXlUaz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZ2lIcmFNU1M0SXkvaForM1o1aFJpYUR2Vnc1bW55bHZYT294Sm9TRVg2SHE4aTY5R1RNbUU0RGpTR1ZaNXNXUk9Ucm9UWjE5ZzlwbkFrTjkzVnFjQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6InJDc0k1bXN5T1FTRCswakVVNnN6KzF0SjYzMlo2djR6LzJOc1J5MkRzUWxnT0hVcGRlNlRPbUp3Zkg4RnNTVU1iLys1NS9ldnpHcUpyYXp2WEY3c2hRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODE1ODUzMjc2ODoyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmNVYSs2QmFBbndtRTJsRlVDMTg5UTBvVGZrMWhYcHEzd0hKL2NBUmpNazUifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNCSUlEUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NTI1Mjc5OCwibGFzdFByb3BIYXNoIjoiMkc0QW11IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFJeVEifQ==",
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
