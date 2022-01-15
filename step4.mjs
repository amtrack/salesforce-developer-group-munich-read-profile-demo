#!/usr/bin/env node

import { Org } from "@salesforce/core";

async function run() {
  const org = await Org.create({});
  const conn = org.getConnection();
  const type = "Profile";
  const fullName = "Admin";
  const mdJson = await conn.metadata.read(type, fullName);
  console.log(JSON.stringify(mdJson, null, 2));
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
