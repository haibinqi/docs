import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "../build/server";

// Force recompile
export const onRequest = createPagesFunctionHandler({
  build,
  getLoadContext({ env }) {
    return env as unknown as any;
  },
});
