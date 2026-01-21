import { createRequestHandler } from "@remix-run/express";
import { broadcastDevReady, installGlobals } from "@remix-run/node";
import express from "express";
import { readFileSync } from "fs";
import { join } from "path";

installGlobals();

const BUILD_PATH = "./build/index.js";
const build = await import(BUILD_PATH);

const app = express();

app.use(express.static("public", { maxAge: "1h" }));

app.all("*", createRequestHandler({ build }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);

  if (process.env.NODE_ENV === "development") {
    broadcastDevReady(build);
  }
});
