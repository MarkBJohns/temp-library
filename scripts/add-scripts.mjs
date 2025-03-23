#!/usr/bin/env node
import { readFile, writeFile } from "fs/promises";
import path from "path";

const projectRoot = process.env.INIT_CWD || process.cwd();
const pkgPath = path.join(projectRoot, "package.json");

const newScripts = {
    import: "node ./node_modules/pinellas-web-library/scripts/import-component.mjs",
    template: "node ./node_modules/pinellas-web-library/scripts/upload-template.mjs"
};

const pkgRaw = await readFile(pkgPath, "utf-8");
const pkg = JSON.parse(pkgRaw);

pkg.scripts = pkg.scripts || {};

let updated = false;

for (const [key, value] of Object.entries(newScripts)) {
    if (pkg.scripts[key] !== value) {
        pkg.scripts[key] = value;
        updated = true;
        console.log(`Added script: ${key}`);
    }
}

if (updated) {
    await writeFile(pkgPath, JSON.stringify(pkg, null, 2));
    console.log("package.json scripts updated");
}