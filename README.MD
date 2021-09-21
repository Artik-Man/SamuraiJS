# SamuraiJS

Super simple [Nunjucks](https://mozilla.github.io/nunjucks/) + [TypeScript](https://sass-lang.com/)

+ [Sass](https://sass-lang.com/) builder

## Installation

```bash
npm i samuraijs
```

## Configuration

samurai.js

```javascript
import {readFileSync} from 'fs';
import {resolve} from 'path';
import {Builder, Server} from "samuraijs";

const config = {
    paths: {
        source: 'src',
        destination: 'dist',
        assets: ['src/assets'], 
        exclude: [
            'src/templates',
            'src/styles',
            'src/scripts'
        ]
    },
    logLevel: 'debug', // debug or nothing
    nunjucks: {
        // nunjucks config
        autoescape: true,
        trimBlocks: true,
        noCache: true,
        globals: {
            // see: nunjucks addGlobal()
            loadJson: (path) => {
                return JSON.parse(readFileSync(resolve(path), "utf8"))
            }
        }
    },
    esbuild: {
        // esbuild config
        minify: true,
        bundle: true,
        write: false
    },
    sass: {
        // sass config
        outputStyle: "compressed"
    },
    server: {
        // browser-sync config
        port: 3000,
        open: false
    }
}

if (process.argv.includes('--build')) {
    new Builder(config).build()
} else if (process.argv.includes('--serve')) {
    new Server(config);
} else {
    throw 'Unknown action'
}

```