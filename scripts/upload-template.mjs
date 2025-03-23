#!/usr/bin/env node
import { existsSync, rmSync, cpSync } from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const templatePath = args[0];
const skipConfirm = args.includes("-y");

if (!templatePath) {
    console.error("Please provide a template name");
    process.exit(1);
}

const source = path.resolve(__dirname, "../", templatePath);
const target = process.cwd();

if (!existsSync(source)) {
    console.error(`Template not found: ${source}`);
    process.exit(1);
}

const confirmAndRun = async () => {
    if (skipConfirm) {
        replaceDirectory();
        return;
        
    }
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.question(
        `This will permanently delete ${target} and all of its contents. This cannot be undone. Continue? (y/n)`,
        (answer) => {
            rl.close();
            
            if (answer.toLowerCase() === "y") {
                replaceDirectory();
                
            } else {
                console.log("Process aborted");
                process.exit(0);
            }
        }
    )
}

const replaceDirectory = () => {
    console.log(`Replacing ${target} with ${templatePath}...`);
    rmSync(target, { recursive: true, force: true });
    cpSync(source, target, { recursive: true });
    console.log("Template applied");

    console.log(`\nTo re-enter the directory, type:`);
    console.log(`$ cd ../${path.basename(target)}`);
    console.log(`$ npm install`);
    console.log(`$ npm run dev`);
}

await confirmAndRun();
