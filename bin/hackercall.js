#!/usr/bin/env node

import { program } from "commander";
import { startClientServer, openClient } from "./utils/index.js";
import { randomUUID } from "node:crypto";

const openBrowser = async (peerId) => {
  let clientURL = await startClientServer();
  clientURL = peerId ? `${clientURL}?peerId=${peerId}` : clientURL;
  await openClient(clientURL);
};

program.command("start").action(openBrowser);

program.command("join").argument("<peerId>").action(openBrowser);

program.parse(process.args);
