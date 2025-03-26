#!/usr/bin/env node
import { existsSync, mkdirSync, rmSync, cpSync } from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const templatePath = args[0];
const destination = args[1];

if (!templatePath || !destination) {
    console.error('Incorrect format, use: "npx template <template-path> <app-name>"');
    process.exit(1);
}

const source = path.resolve(__dirname, "../", templatePath);
const target = path.resolve(process.cwd(), destination);

console.log("ARGS: ", args);
console.log("templatePath: ", templatePath),
console.log("destination: ", destination);

if (!existsSync(source)) {
    console.error(`Template not found: ${source}`);
    process.exit(1);
}

if (existsSync(target)) {
    console.error(`Target folder already exists: ${target}`);
    process.exit(1);
}

mkdirSync(target, { recursive: true });
cpSync(source, target, { recursive: true });

console.log("Template copied");
console.log(`\nTo begin:`);
console.log(`$ cd ${destination}`);
console.log(`$ npm install`);
