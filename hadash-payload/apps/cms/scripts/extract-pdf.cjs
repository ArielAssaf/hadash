
const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

const files = [
    'c:\\Users\\ariel\\code\\hadash\\תקנון חד״ש.pdf',
    'c:\\Users\\ariel\\code\\hadash\\دستور الجبهة-1.pdf'
];

async function run() {
    console.log('Inspecting pdf-parse export...');
    try {
        console.log(JSON.stringify(pdf, null, 2));
    } catch (e) {
        console.log('Cannot stringify:', e.message);
        console.log('Keys:', Object.keys(pdf));
    }

    // Try standard usage in case it was a fluke
    if (typeof pdf === 'function') {
        console.log('It IS a function!');
    }

    // Checking if it's default export
    const parse = pdf.default || pdf;

    // Maybe try to require the lib directly
    try {
        const lib = require('pdf-parse/lib/pdf-parse.js');
        console.log('Required lib/pdf-parse.js directly. Type:', typeof lib);
    } catch (e) {
        console.log('Could not require lib directly:', e.message);
    }

}

run();
