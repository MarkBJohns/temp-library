#!/usr/bin/env node
import { readdir, mkdir, copyFile, readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mapPath = path.join(__dirname, "..", "component-map.json");

if (!existsSync(mapPath)) {
    console.error("component-map.json not found");
    process.exit(1);
}

const map = JSON.parse(await readFile(mapPath, "utf-8"));
const inputName = process.argv[2];
const userCwd = process.env.INIT_CWD || process.cwd();

if (!inputName) {
    console.error("enter component or directory name");
    process.exit(1);
}

const componentRelPath = map[inputName];
if (!componentRelPath) {
    console.error(`"${inputName}" not found`);
    process.exit(1);
}

const libraryComponentPath = path.resolve(
    path.join(__dirname, "..", componentRelPath)
)

const getScssUseStatement = (destPath) => {
    let current = path.dirname(destPath);
    let segmentsUp = 0;
    
    while (current && path.basename(current) !== "src") {
        current = path.dirname(current);
        segmentsUp++;
        if (current === path.dirname(current)) break;
    }
    
    const pathToRoot = "../".repeat(segmentsUp) + "sass/root";
    return `@use "${pathToRoot}" as *;`;
}

const copyComponentFolder = async (src, dest) => {
    const entries = await readdir(src, { withFileTypes: true });
    
    if (!existsSync(dest)) {
        await mkdir(dest, { recursive: true });
    }
    
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            await copyComponentFolder(srcPath, destPath);
            
        } else {
            if (entry.name.endsWith(".module.scss")) {
                const original = await readFile(srcPath, "utf-8");
                const useLine = getScssUseStatement(destPath);
                const updated =
                    original.replace(/^@use .*? as \*;/m, useLine) ||
                    `${useLine}\n${original}`;
                await writeFile(destPath, updated, "utf-8");
                
            } else {
                await copyFile(srcPath, destPath);
            }
        }
    }
}

const targetDir = path.join(userCwd, inputName);
await copyComponentFolder(libraryComponentPath, targetDir);
console.log(`"${inputName}" imported to ${targetDir}`);
