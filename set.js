const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0haamsxQWxOU01BcndUK1FUZCttdncvck01RXh3ZWtMWk1NK20rejlraz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiclJoelFCeGFhS0pJaGxCUHpsbjVSOHllU3V0Z3c0QzZHR3RVdkpLbFRTaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjSHVySTFpcTVXUUhMRmlhQzNqNUFOeUdCOWw0c2c3Q2ZKTzlwUHJSTlhNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2TUlZbHFYcDJMWm1Dc3F1SEdtSzdqZGordnBaWUp2RVByemFacy9nVlJjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNLVG9UTzBGaURVZXFIaUJ2S2Z6Z21hcWNxL3NMQ1FFSDQ2NDg1TCtRWDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVDbGdyWFpCTlIxUnBrRTZxOG1BeTFWU0gvSXgwTzEveDBMaW1VcHJTUTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS053UFVNbEJkSGt1NklMS2ZxamRDbUhyMzNaZWd1WGg2RjBTUGl2amxVbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQTQ4RkRacWVYbE9UVDc3ZHAxb2pzNHF3ZGR0K3g5ZDRJQS9ONzYwRWhsZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNBamJVUE9GRi9ETG9kMUkxRjBDRi9hbE93WkUwTnJyb1lMaDlXOE9kWW1iZkRZblMzRTFuK0J1dnkzWTYxUU5zaHNxUnhFSTVoU1QyNTliWE5iakRRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU0LCJhZHZTZWNyZXRLZXkiOiIxb0thQTlCNzNadDdmTlh2STVRc05HYkdQTUFkc25mVUZNUDd5OW1nZldNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkyMzEzNTI0NjkzN0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJFQzQ4MEY5RjYzNTgxMzdGMTk0Q0QzQTgxMDU0MEQ2MSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUyMTcxNzU5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MjMxMzUyNDY5MzdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQ0MxQzQ4MzU1NjUwNzlFMDRDQzRCMDI4RjFDRjUyOEEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MjE3MTc2Nn0seyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzMTM1MjQ2OTM3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNEMkIyNjA3NzU5MkRBNTM5NzIzQzEyN0RCNEVDMDg1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTIxNzE3Nzh9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjEyM0xPVFVTIiwibWUiOnsiaWQiOiI5MjMxMzUyNDY5Mzc6OTNAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiI0NzY0MDMzMDkwNzg1NTo5M0BsaWQiLCJuYW1lIjoi5b2h8J2QkvCdkKHwnZCa8J2QofCdkLPwnZCa8J2QneKYhvCdkIDwnZCn8J2QrPCdkJrwnZCr8J2QouW9oSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTTZaeDBjUXlvbkF3d1lZQkNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoic0ZqSHdpd1RFOEtGQ2FSNnprV2lJZ01rUFlsdzBKZXpkVzA5dW1Kbi9EVT0iLCJhY2NvdW50U2lnbmF0dXJlIjoianFUZzA5Y0xLUnQ2QUF3VGxRSHV0cXp0NHZZd1NaRjVyRXk3YkJLRDdqMnE3YUxEYU10aVQvUVQ2YllvNnNaSXVJb2pBN1NsRmw5d09XbmNKSlZIRHc9PSIsImRldmljZVNpZ25hdHVyZSI6IlBUdUpteUx1akFWZm50elYyMmEyS2pqb3k4aUtoeDdHK3Zkb2VzSUxsRDVHSTl6SzNyaVlXTk5qQ25UWVJDa0d4bGhNZGxIZ0tYTlFrVHVPMldJVkR3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMTM1MjQ2OTM3OjkzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJCWXg4SXNFeFBDaFFta2VzNUZvaUlESkQySmNOQ1hzM1Z0UGJwaVovdzEifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBSUlFZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MjE3MTczNywibGFzdFByb3BIYXNoIjoiMUs0aEg0IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFBb0MifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "®Charleske",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "923135246937",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/0bszdm.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'no',
    AUDIO_CHATBOT : process.env.AUDIO_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
