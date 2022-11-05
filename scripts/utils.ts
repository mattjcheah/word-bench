import fs from "fs";
import path from "path";

export const readWordList = (filename: string) => {
  return fs
    .readFileSync(path.join(__dirname, `./tmp/input/${filename}`), "utf-8")
    .split("\n");
};

export const writeFile = (filepath: string, contents: string) => {
  fs.writeFileSync(path.join(__dirname, "./tmp", filepath), contents);
};
