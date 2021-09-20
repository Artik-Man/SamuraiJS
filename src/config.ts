export interface Config {
    paths: {
        source: 'src',
        destination: 'dist',
        assets?: ['src/assets'],
        exclude?: ['src/templates', 'src/styles', 'src/scripts']
    },
    logLevel?: 'debug',
    nunjucks?: {
        autoescape?: true,
        trimBlocks?: true,
        noCache?: true,
        globals?: {
            [k: string]: () => any;
        }
    },
    esbuild?: {
        minify?: true,
        bundle?: true,
        write?: false
    },
    sass?: {
        outputStyle?: "compressed"
    },
    server?: {
        port?: 3000,
        open?: false
    }
}