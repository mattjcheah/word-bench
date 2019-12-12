const fs = require("fs");

const wordBuffer = fs.readFileSync(__dirname + "/words1000.txt");
const words = wordBuffer
  .toString()
  .split("\n")
  .filter(word => word.length >= 3 && word.length <= 7);

fs.writeFileSync(__dirname + "/wordlist.json", JSON.stringify(words, null, 2));
