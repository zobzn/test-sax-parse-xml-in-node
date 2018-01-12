const fs = require("fs");
const sax = require("sax");
const flow = require("xml-flow");

console.time("test");

const xmlFileName = "aspo.xml" || "alfabroc.xml";

const strStream = fs.createReadStream(xmlFileName);
const xmlStream = flow(strStream, { strict: true });
const ids = [];

xmlStream.on("tag:offer", offer => {
  // console.log(offer["$attrs"]);
  process.stdout.write(".");
  ids.push(offer["$attrs"]["internal-id"]);

  if (false && ids.length > 100) {
    strStream.destroy();
  }
});

strStream.on("end", () => {
  process.stdout.write("\n");
  // process.stdout.write(ids.join("\n"));
  process.stdout.write(`total: ${ids.length}`);
  process.stdout.write("\n");
  // console.log(ids);
  console.timeEnd("test");
});
