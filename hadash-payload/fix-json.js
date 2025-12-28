const fs = require('fs');
const path = './apps/cms/src/app/(payload)/api/seed-complete/reference-content.json';
let data = fs.readFileSync(path, 'utf8');

// Escape double quotes that are clearly inside strings
// This regex looks for a double quote that is surrounded by Hebrew characters
data = data.replace(/([\u0590-\u05FF])"([\u0590-\u05FF])/g, '$1\\"$2');

// Also catch cases like "עו"ד (quote at the beginning of a word)
data = data.replace(/"([\u0590-\u05FF]+)"/g, '\\"$1\\"');

// Specifically fix the ones we saw
data = data.replace(/עו"ד/g, 'עו\\"ד');
data = data.replace(/חד"ש/g, 'חד\\"ד');
data = data.replace(/מק"י/g, 'מק\\"י');
data = data.replace(/ד"ר/g, 'ד\\"ר');

fs.writeFileSync(path, data);
console.log('Fixed!');
