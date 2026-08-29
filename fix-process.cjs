const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'components', 'cinematic', 'ProcessCinematic.jsx');
let c = fs.readFileSync(filePath, 'utf8');

// Read the file and find the exact text to replace
const search = ' initial={{ opacity: 0 }}\r\n animate={inView ? { opacity: 1 } : { opacity: 0 }}\r\n transition={{ duration: 0.5, delay: reduced ? 0 : 0.5 + i * 0.12 }}';

if (!c.includes(search)) {
 console.error('FAILED - pattern not found');
 console.log('File encoding info:');
 console.log('Has CR:', c.includes('\r'));
 console.log('Has LF:', c.includes('\n'));
 // Show first occurrence area
 const idx = c.indexOf('initial={{ opacity: 0 }}');
 console.log('Found at:', idx);
 const seg = c.substring(idx - 5, idx + 80);
 console.log('Segment:', JSON.stringify(seg));
 process.exit(1);
}

const replace = ` initial={{ opacity: 0, height: 0 }}
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

c = c.replace(search, replace);
fs.writeFileSync(filePath, c, 'utf8');
console.log('SUCCESS - ProcessCinematic.jsx updated');
console.log('Replacement length:', replace.length, 'chars');
