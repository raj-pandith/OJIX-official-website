const fs = require('fs');
const p = String.raw`C:\Users\rajpa\OneDrive\Desktop\ojix\Ojix 1.0 Modification\app\cinematic\globals-cinematic.css`;
let c = fs.readFileSync(p, 'utf8');
const idx = c.indexOf('.tech-stack-3d-container');
console.log(JSON.stringify(c.substring(idx, idx + 500)));
