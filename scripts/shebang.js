const fs = require('fs');

const head = fs.readFileSync('../shebang.txt');
const body = fs.readFileSync('../bin/mpc.js');

fs.writeFileSync('../bin/mpc.js', head  + body);