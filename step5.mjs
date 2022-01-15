#!/usr/bin/env node

import { Org } from "@salesforce/core";
import { Builder } from "xml2js";

async function run() {
  const org = await Org.create({});
  const conn = org.getConnection();
  const type = "Profile";
  const fullName = "Admin";
  const mdJson = await conn.metadata.read(type, fullName);
  delete mdJson.fullName;
  const mdXml = convertToXml(type, mdJson);
  console.log(mdXml);
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

function convertToXml(type, data) {
  return (
    new Builder({
      xmldec: {
        version: "1.0",
        encoding: "UTF-8",
      },
      rootName: type,
      renderOpts: {
        pretty: true,
        indent: "    ", // 4 spaces
        newline: "\n",
      },
    }).buildObject({
      ...data,
      ...{
        $: {
          xmlns: "http://soap.sforce.com/2006/04/metadata",
        },
      },
    }) + "\n"
  );
}
