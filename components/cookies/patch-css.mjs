import fs from 'fs';

// Read the cookie CSS file
const cookieCss = fs.readFileSync('components/cookies/_cookie-styles.css', 'utf8');

// Append to globals-cinematic.css
const cssPath = 'app/cinematic/globals-cinematic.css';
let css = fs.readFileSync(cssPath, 'utf8');

if (!css.includes('COOKIE CONSENT')) {
 fs.appendFileSync(cssPath, '\n' + cookieCss);
 console.log('Appended cookie CSS to globals-cinematic.css');
} else {
 console.log('Cookie CSS already present');
}
