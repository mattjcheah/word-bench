import * as dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import pLimit from "p-limit";
import { Crossword } from "./generateCrossword";

const publishCrosswords = () => {
  const supabase = createClient(
    process.env.SUPABASE_URL ?? "",
    process.env.SUPABASE_KEY ?? ""
  );

  const crosswords: Crossword[] = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "./tmp/output/crosswords.json"),
      "utf-8"
    )
  );

  const limit = pLimit(5);

  crosswords.map((cw) => {
    return limit(async () => {
      const { error } = await supabase
        .from("boards")
        .upsert(cw, { onConflict: "baseWord" });

      if (error) {
        console.log(error);
      }
    });
  });
};

publishCrosswords();
