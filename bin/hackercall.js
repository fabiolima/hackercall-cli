#!/usr/bin/env node

import { program } from "commander";
import { openClient } from "./utils/index.js";

const clientURL = new URL("https://hackercall-client.onrender.com");

const openBrowser = async (peerId = null) => {
  if (typeof peerId === "string")
    clientURL.searchParams.append("peerId", peerId);

  await openClient(clientURL);
};

program.command("start").action(openBrowser);

program.command("join").argument("<peerId>").action(openBrowser);

program.parse(process.args);
