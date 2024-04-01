import { loadEnv } from "vite";
import fs from "fs";
import os from "os";
const env = loadEnv("", process.cwd(), "");
// const fs = require('node:fs');

const gitpod = process.env.GITPOD_WORKSPACE_URL;
const homedir = os.homedir();

// Load env file based on `mode` in the current working directory.
// Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
// key: homedir + '/.config/valet/Certificates/' + host + '.key',
// cert: homedir + '/.config/valet/Certificates/' + host + '.crt',
const host = gitpod ? "0.0.0.0" : env.VITE_DEV_SERVER_HOST;
const workspaceUrl = gitpod
    ? process.env.GITPOD_WORKSPACE_URL
    : env.VITE_DEV_SERVER_URL;

const corsOrigin = gitpod
    ? process.env.GITPOD_WORKSPACE_URL.replace("https://", "https://8000-")
    : workspaceUrl;

const https = false; //env.VITE_SECURE_SERVER
// ? {
//       key: fs.readFileSync(`${homedir}${env.VITE_SECURE_SERVER_KEY}`),
//       cert: fs.readFileSync(`${homedir}${env.VITE_SECURE_SERVER_CERT}`),
//   }
// : false;

export default {
    host,
    https,
    cors: {
        origin: corsOrigin,
        credentials: true,
    },
    hmr: process.env.GITPOD_WORKSPACE_URL
        ? {
              // removes the protocol and replaces it with the port we're connecting to
              host: process.env.GITPOD_WORKSPACE_URL.replace(
                  "https://",
                  "3000-",
              ),
              protocol: "wss",
              clientPort: 443,
          }
        : true,
};
// })
