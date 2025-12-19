import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "../build/server";

// Force recompile 30
export const onRequest = createPagesFunctionHandler({
  build,
  getLoadContext: (context) => {
    return {
      cloudflare: {
        env: context.env
      }
    };
  },
});
