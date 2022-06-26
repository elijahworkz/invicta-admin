import { defineConfig, loadEnv } from 'vite'
const env = loadEnv('', process.cwd(), '')

const gitpod = process.env.GITPOD_WORKSPACE_URL

// export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.

  const host = gitpod ? '0.0.0.0' : env.VITE_DEV_SERVER_HOST
  const workspaceUrl = gitpod
    ? process.env.GITPOD_WORKSPACE_URL
    : env.VITE_DEV_SERVER_URL

  const corsOrigin = gitpod
    ? process.env.GITPOD_WORKSPACE_URL.replace('https://', 'https://8000-')
    : workspaceUrl


  export default {
      host,
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