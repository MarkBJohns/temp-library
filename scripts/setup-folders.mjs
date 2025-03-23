#!/user/bin/env node
import { mkdir, readdir, copyFile, stat } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = process.env.INIT_CWD || process.cwd();
const targetSrc = path.join(projectRoot, "src");
const targetSass = path.join(targetSrc, "sass");
const targetComponents = path.join(targetSrc, "components");
const librarySass = path.join(__dirname, "../src/sass");

const copyRecursive = async (src, dest) => {
    await mkdir(dest, { recursive: true });
    const entries = await readdir(src, { withFileTypes: true });
    
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            await copyRecursive(srcPath, destPath);
            
        } else {
            await copyFile(srcPath, destPath);
        }
    }
}

await mkdir(targetComponents, { recursive: true });
await copyRecursive(librarySass, targetSass);
console.log('"sass" and "components" folder ready');