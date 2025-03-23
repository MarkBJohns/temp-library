#!/usr/bin/env node
// import { exec } from "child_process";
// import { promisify } from "util";
import { spawn } from "child_process";

// const run = promisify(exec);
const run = (cmd) =>
    new Promise((resolve, reject) => {
        const [command, ...args] = cmd.split(" ");
        const child = spawn(command, args, { stdio: "inherit", shell: true });
        
        child.on("close", (code) => {
            if (code !== 0) reject(new Error(`Command failed: ${cmd}`));
            else resolve();
        });
    });

// ALL SCRIPTS

await run(`node node_modules/pinellas-web-library/scripts/install-library-dependencies.mjs`);

await run(`node node_modules/pinellas-web-library/scripts/generate-component-map.mjs`)

await run(`node node_modules/pinellas-web-library/scripts/setup-folders.mjs`);

await run(`node node_modules/pinellas-web-library/scripts/add-scripts.mjs`);

// RUN SCRIPTS

await run("npm install");