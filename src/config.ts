import { BuildOptions  as EsBuildOptions} from 'esbuild';
import { ConfigureOptions as NunjucksOptions } from 'nunjucks';
import { Options as SassOptions } from 'sass';
import { Options as BrowserSyncOptions } from 'browser-sync';

/**
 * Nunjucks:
 *   Options: https://mozilla.github.io/nunjucks/api.html#configure
 *     globals: https://mozilla.github.io/nunjucks/api.html#addglobal
 *
 * EsBuild:
 *   Options: https://esbuild.github.io/api/#simple-options
 *
 * Sass:
 *   Options: https://sass-lang.com/documentation/js-api#options
 */
export interface Config {
    paths: {
        source: string;
        destination: string;
        assets?: string[];
        exclude?: string[];
    },
    logLevel?: 'debug' | 'none';
    nunjucks?: NunjucksOptions & {
        globals?: {
            [k: string]: (...args: any[]) => any;
        };
    },
    esbuild?: EsBuildOptions;
    sass?: SassOptions;
    server?: BrowserSyncOptions;
}