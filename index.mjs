import fs from 'fs';
import path from 'path';
import { argv } from 'process';
import data from './source.js';

const names = data.map(it => it[0]).filter(it => it);

const normalPackages = []
const flag = true;

if (!argv[2]) {
    console.log('Usage: mpc package-lock.json')
}

const checkP = (bugs, name) => {
    normalPackages.push(name);
    if (bugs.includes(name)) {
        console.log(`此包存在风险：${name}, 请及时处理`)
        flag = false;
        return name;
    }
    return null;
}

try {
    const plf = fs.readFileSync(argv[2] || './package-lock.json');
    const deps = JSON.parse(plf).dependencies;
    const currentPackageNames = Object.keys(deps);

    currentPackageNames.forEach(it => {
        const others = Object.keys(deps[it].requires || {} );
        others.forEach(it => checkP(names, it))
    })

    currentPackageNames.forEach((n) => checkP(names, n));

    if (flag) {
        console.log('检查文件：' + path.resolve(argv[2]))
        console.log('未检测出漏洞');
    }

} catch (error) {
    console.error(error);
    console.log('Usage: mpc package-lock.json')
}

// console.log(normalPackages)
// console.log(names);
