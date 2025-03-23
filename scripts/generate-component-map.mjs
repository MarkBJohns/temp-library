#!/usr/bin/env node
import { log, warn } from "console";
import { readdir, stat, writeFile, copyFile, chmod } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import os from "os";
import { exec } from "child_process";
import { promisify } from "util";
import { existsSync } from "fs";

const run = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.join(__dirname, "../src/components");
const mapOutputPath = path.join(__dirname, "../component-map.json");
const consumerRoot = process.cwd();
const projectMapPath = path.join(consumerRoot, "component-map.json");

if (existsSync(mapOutputPath)) {
    try {
        await copyFile(mapOutputPath, projectMapPath);
        log("component-map.json already exists");
        
        if (os.platform() === "win32") {
            await run(`attrib +R "${projectMapPath}"`);
            
        } else {
            await chmod(projectMapPath, 0o444);
        }
        
    } catch (e) {
        warn('Failed to copy "component-map.json"');
    }
    
    process.exit(0);
}

const validComponents = {};

const findExportableComponents = async (dir) => {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const isDir = (await stat(fullPath)).isDirectory();
        
        if (isDir) {
            const indexJs = path.join(fullPath, "index.js");
            const indexJsx = path.join(fullPath, "index.jsx");
            
            try {
                await stat(indexJs);
                validComponents[entry.name] = path.relative(path.join(__dirname, ".."), fullPath);
                continue;
                
            } catch { }
            
            try {
                await stat(indexJsx);
                validComponents[entry.name] = path.relative(path.join(__dirname, ".."), fullPath);
                
            } catch { }
        }
    }
}

await findExportableComponents(componentsDir);
log("valid components found: ", Object.keys(validComponents));

await writeFile(mapOutputPath, JSON.stringify(validComponents, null, 2));
log("generated component-map.json");

try {
    await copyFile(mapOutputPath, projectMapPath);
    log("component-map.json copied to new project");
    
    if (os.platform() === "win32") {
        await run(`attrib +R "${projectMapPath}"`);
        
    } else {
        await chmod(projectMapPath, 0o444);
    }
    
} catch (e) {
    warn('Failed to copy or lock "component-map.json"', e.message);
}