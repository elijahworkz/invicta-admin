import { loadEnv } from 'vite'
const env = loadEnv('', process.cwd(), '')
const fs = require('node:fs');

const gitpod = process.env.GITPOD_WORKSPACE_URL

  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.

  const host = gitpod ? '0.0.0.0' : env.VITE_DEV_SERVER_HOST
  const workspaceUrl = gitpod
    ? process.env.GITPOD_WORKSPACE_URL
    : env.VITE_DEV_SERVER_URL

  const corsOrigin = gitpod
    ? process.env.GITPOD_WORKSPACE_URL.replace('https://', 'https://8000-')
    : workspaceUrl

  const https = env.VITE_SECURE_SERVER
    ? {
      key: fs.readFileSync('/home/ilya/new.ibc.local-key.pem'),
      cert: fs.readFileSync('/home/ilya/new.ibc.local.pem')
    }
    : false

  export default {
      host,
      https,
      cors: {
        origin: corsOrigin,
        credentials: true
      },
      hmr: process.env.GITPOD_WORKSPACE_URL
      ? {
          // removes the protocol and replaces it with the port we're connecting to
          host: process.env.GITPOD_WORKSPACE_URL.replace('https://', '3000-'),
          protocol: 'wss',
          clientPort: 443
        }
      : true
  }
// })