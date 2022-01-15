#!/usr/bin/env node

async function run() {
  console.log("hi");
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
