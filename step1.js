async function run() {
  console.log("hi");
  throw new Error("HEY!");
}

run().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
