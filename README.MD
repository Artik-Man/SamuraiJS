# SamuraiJS

Super simple
[Nunjucks](https://mozilla.github.io/nunjucks/) +
[TypeScript](https://sass-lang.com/) +
[Sass](https://sass-lang.com/)
builder primarily for static sites

## Installation

```bash
npm i samuraijs
```

## Configuration

### Step 1

Minimal config:

*samurai.js*

```javascript
import {Samurai} from "samuraijs";

new Samurai({
    paths: {
        source: 'src',
        destination: 'dist'
    }
});
```

### Step 2

Add the following lines to your `package.json`:

```json
{
  "scripts": {
    "serve": "node samurai.js --serve",
    "build": "node samurai.js --build"
  },
  "type": "module"
}
```

### Step 3

Serve the project:

```bash
npm run serve
```

Build the project:

```bash
npm run build
```

## Full configuration

*samurai.js*

```javascript
import {Samurai} from "samuraijs";

new Samurai({
    paths: {
        source: 'src',
        destination: 'dist',
        assets: ['src/assets'],
        exclude: ['src/templates', 'src/styles', 'src/scripts']
    },
    logLevel: 'debug',
    nunjucks: {
        // https://mozilla.github.io/nunjucks/api.html#configure
        autoescape: true,
        trimBlocks: true,
        noCache: true,
        globals: {
            // https://mozilla.github.io/nunjucks/api.html#addglobal
            hello: (name) => {
                return `Hello, ${name}`
            }
        }
    },
    esbuild: {
        // https://esbuild.github.io/api/#simple-options
        minify: true,
        bundle: true
    },
    sass: {
        // https://sass-lang.com/documentation/js-api#options
        outputStyle: "compressed"
    },
    server: {
        // https://browsersync.io/docs/options
        port: 3000,
        open: false
    },
    fileProcessor: (path) => {
        if (path.lastIndexOf('.jpg') === 0) {
            // Convert a file or do something else ...
            return true;
        }
        return false; // if true, the builder will not touch this file
    }
});
```

## How it works

Source directory tree:

```
/src/
|  index.njk *
|  index.json
|  index.ts
|  index.scss
|  
|  scripts.ts
|  styles.scss
|  
|  /another-route/
|  |  index.njk *
|  |  index.json
|  |  index.ts
|  |  index.scss
|  |  
|  |  page2.njk
|  |  page2.json
|  |
|  |  _page2-inner-component.njk **
|  |
|  /templates/
|  |  _header.njk **
|  |  _footer.njk **
|  |
|  /scripts/
|  |  module1.ts
|  |  module2.ts
|  |
|  /styles/
|  |  main-styles.scss
|  |  utils.scss
   

* - required file
** - cannot have context *.json file, inner scripts / styles
```

For each *.njk components will be created a *.html file that includes a template, script and style:

```html

<style>
    /* Content of *.scss file (compiled) */
</style>
<!-- Content of *.njk file (compiled) -->
<script>
    // Content of *.ts file (compiled)
</script>
```

Every **entry-point** can have *.json file named like this entry-point. This *.json includes context for *.njk file:

```
/route-one/
|  page.njk
|  page.json
```

*page.njk*

```html

<ul>
    {% for item in list %}
    <li>{{ item }}</li>
    {% endfor %}
</ul>
```

*page.json*

```json
{
  "list": [
    1,
    2,
    3,
    4,
    5
  ]
}
```

*.njk files starting with `_` will be skipped. Such files will **not** be considered entry points: `_menu.njk`.

Every **not-entry-point** _*.njk file should not have context *.json file! If this file is exist, it will be ignored.

Another files (like `scripts.ts` or `styles.scss`) will be compiled and placed in destination path.

Assets will just be copied to the destination directory.

## Example projects:

* [https://github.com/Artik-Man/Artik.me](https://github.com/Artik-Man/artik.me)
* [https://github.com/Artik-Man/HTML-Practice](https://github.com/Artik-Man/HTML-Practice)
