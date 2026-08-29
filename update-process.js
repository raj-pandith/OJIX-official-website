const fs = require('fs');
const path = 'components/cinematic/ProcessCinematic.jsx';
let c = fs.readFileSync(path, 'utf8');

const oldBlock = ` initial={{ opacity: 0 }}
 animate={inView ? { opacity: 1 } : { opacity: 0 }}
 transition={{ duration: 0.5, delay: reduced ? 0 : 0.5 + i * 0.12 }}`;

const newBlock = ` initial={{ opacity: 0, height: 0 }}
 animate={
 inView
 ? {
 opacity: 1,
 height: p.height,
 transition: {
 height: {
 duration: reduced ? 0 : 0.6,
 ease: [0.16, 1, 0.3, 1],
 delay: reduced ? 0 : 0.5 + i * 0.3,
 },
 opacity: {
 duration: 0.01,
 delay: reduced ? 0 : 0.5 + i * 0.3,
 },
 },
 }
 : { opacity: 0, height: 0 }
 }`;

if (!c.includes(oldBlock)) {
 console.error('Pattern not found, aborting');
 process.exit(1);
}

c = c.replace(oldBlock, newBlock);
fs.writeFileSync(path, c);
console.log('ProcessCinematic.jsx updated successfully');
