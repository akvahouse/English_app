// Перевірка синтаксису Swift-файлів через tree-sitter-swift (на Linux без Xcode).
// Запуск: node tools/swift-syntax-check.mjs [files...]  (без аргументів — усі EnglishNotebook/**/*.swift)
// Потрібно: npm i tree-sitter tree-sitter-swift (у tools/ або глобально через NODE_PATH).
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const Parser = require("tree-sitter");
const Swift = require("tree-sitter-swift");
const parser = new Parser();
parser.setLanguage(Swift);

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith(".swift") ? [path.join(d, e.name)] : []);
const files = process.argv.length > 2 ? process.argv.slice(2) : walk(path.join(root, "EnglishNotebook"));
let bad = 0;
for (const f of files) {
  const tree = parser.parse(fs.readFileSync(f, "utf8"));
  const errors = [];
  const visit = n => { if (n.type === "ERROR" || n.isMissing) errors.push(n); else n.children.forEach(visit); };
  visit(tree.rootNode);
  if (errors.length) {
    bad++;
    console.log(`✗ ${path.relative(root, f)}`);
    errors.slice(0, 5).forEach(e => console.log(`   рядок ${e.startPosition.row + 1}:${e.startPosition.column + 1} ${e.isMissing ? "MISSING " + e.type : "ERROR"}: ${e.text.slice(0, 80).replace(/\n/g, "⏎")}`));
  } else console.log(`✓ ${path.relative(root, f)}`);
}
console.log(bad ? `\n${bad} файл(ів) із синтаксичними помилками` : `\nУсі ${files.length} файлів розпарсились без помилок`);
process.exit(bad ? 1 : 0);
