/// <reference types="vite/client" />
/// <reference types="@remix-run/cloudflare" />

interface Env {
  DB: D1Database;
}

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: {
      env: Env;
    };
  }
}
