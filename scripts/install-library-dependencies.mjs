#!usr/bin/env node
import { readFile, writeFile } from "fs/promises";
import path from "path";

const projectRoot = process.env.INIT_CWD || process.cwd();
const consumerPkgPath = path.join(projectRoot, "package.json");
const libraryPkgPath = new URL("../package.json", import.meta.url).pathname;

const consumerRaw = await readFile(consumerPkgPath, "utf-8");
const libraryRaw = await readFile(libraryPkgPath, "utf-8");

const consumerPkg = await JSON.parse(consumerRaw);
const libraryPkg = await JSON.parse(libraryRaw);

consumerPkg.dependencies = consumerPkg.dependencies || {};
const existing = consumerPkg.dependencies;
const required = libraryPkg.dependencies || {};

let updated = false;

for (const dep in required) {
    if (!existing[dep]) {
        existing[dep] = required[dep];
        updated = true;
        console.log(`added ${dep}@${required[dep]}`);
    }
}

if (updated) {
    await writeFile(consumerPkgPath, JSON.stringify(consumerPkg, null, 2));
    console.log("updated consumer package.json")
    
} else {
    console.log("All dependencies already in package");
}