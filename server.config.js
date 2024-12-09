import { loadEnv } from "vite";
import fs from "fs";
import os from "os";
const env = loadEnv("", process.cwd(), "");
// const fs = require('node:fs');

const homedir = os.homedir();

// Load env file based on `mode` in the current working directory.
// Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
// key: homedir + '/.config/valet/Certificates/' + host + '.key',
// cert: homedir + '/.config/valet/Certificates/' + host + '.crt',
const host = env.VITE_DEV_SERVER_HOST;
const workspaceUrl = env.VITE_DEV_SERVER_URL;

const corsOrigin = workspaceUrl;

// const https = env.VITE_SECURE_SERVER
//   ? {
//       key: fs.readFileSync(`${homedir}${env.VITE_SECURE_SERVER_KEY}`),
//       cert: fs.readFileSync(`${homedir}${env.VITE_SECURE_SERVER_CERT}`),
//     }
//   : false;

export default {
  host,
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
  hmr: true,
};
