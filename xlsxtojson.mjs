import * as XLSX from 'xlsx/xlsx.mjs';
import * as fs from 'fs';

XLSX.set_fs(fs);


const xlsxToJSON = (sheet, firstHead = false) => {
    let sources = [];

    const keys = Object.keys(sheet);
    const first = keys.shift();
    const lc = sheet[first].split(':')[1].replace(/\d/g, '').charCodeAt();
    for (let i = 1; i < keys.length; i++) {
        const row = [];
        for (let j = 65; j <= lc; j++) {
            const line = sheet[`${String.fromCharCode(j)}${i}`];
            row.push(line ? line.v : '');
        }
        if (row.filter(r => r).length > 0) {
            sources.push(row)
        }
    }
    if (firstHead) {
        const head = sources.shift();
        sources = sources.map(it => Object.assign(...head.map((k, i) => ({ [k]: it[i]}))))
    }
    return sources;
}


const workbook = XLSX.readFile('./malicious_nodejs_package_source.xlsx');
// const workbook = XLSX.readFile('./test.xlsx');
const { Sheets } = workbook;
for (let s in Sheets) {
    const json = xlsxToJSON(Sheets[s], true);
    fs.writeFileSync('source.js', `export default ${JSON.stringify(json)}`)
}
