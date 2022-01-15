#!/usr/bin/env node

import { Org } from "@salesforce/core";

async function run() {
  const org = await Org.create({});
  const conn = org.getConnection();
  console.log(conn.getUsername());
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
