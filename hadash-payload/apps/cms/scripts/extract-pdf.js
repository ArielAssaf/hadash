
import fs from 'fs';
import pdf from 'pdf-parse';
import path from 'path';

const files = [
    'c:\\Users\\ariel\\code\\hadash\\תקנון חד״ש.pdf',
    'c:\\Users\\ariel\\code\\hadash\\دستور الجبهة-1.pdf'
];

async function run() {
    console.log('Imported pdf:', pdf);

    for (const file of files) {
        console.log(`--- Extracting ${path.basename(file)} ---`);
        if (fs.existsSync(file)) {
            try {
                const dataBuffer = fs.readFileSync(file);
                const data = await pdf(dataBuffer);
                console.log('--- START TEXT ---');
                console.log(data.text);
                console.log('--- END TEXT ---');
            } catch (e) {
                console.error(`Error reading ${file}:`, e.message);
            }
        } else {
            console.error(`File not found: ${file}`);
        }
    }
}

run();
