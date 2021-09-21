import nunjucks from 'nunjucks';
import MarkdonwIt from 'markdown-it';
import {writeFile, readFileSync} from "fs";

const env = nunjucks.configure({
    autoescape: false,
});
env.addGlobal('markdown', src => {
    const content = readFileSync(src, 'utf-8');
    const md = new MarkdonwIt();
    return md.render(content);
});

const content = nunjucks.render('./src/docs/index.njk');
console.log(content)
writeFile('./docs/index.html', content, err => {
    if (err) {
        console.error(err);
    }
})