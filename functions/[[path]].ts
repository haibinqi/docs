import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "../build/server";

// Force recompile 27
export const onRequest = createPagesFunctionHandler({
  build,
  getLoadContext({ env }) {
    return env as unknown as any;
  },
});
