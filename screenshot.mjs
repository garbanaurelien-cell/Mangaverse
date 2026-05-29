import { writeFile } from "node:fs/promises";
import { argv } from "node:process";

const url = argv[2] ?? "http://localhost:3000";
const suffix = argv[3] ?? "default";

const content = `Screenshot workflow placeholder. Target URL: ${url}. Suffix: ${suffix}.`;
await writeFile(`./screenshot-${suffix}.txt`, content, "utf8");
console.log(`Generated placeholder screenshot file for ${url}`);
