import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "../build/server";

export const onRequest = createPagesFunctionHandler({
  build,
  getLoadContext: (context) => {
    return {
      cloudflare: {
        env: context.env,
        ctx: context.ctx,
        caches: context.caches,
        cf: context.request.cf,
      }
    };
  },
});
