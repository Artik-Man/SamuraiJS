import browserSync from "browser-sync";
import { Builder } from "./builder.js";
import { Config } from "./config";

export class Server {

    constructor(private config: Config) {
        const builder = new Builder(this.config);
        builder.build();

        browserSync({
            ...config.server,
            server: this.config.paths.destination
        });

        browserSync.watch(this.getSourceFiles()).on('change', () => {
            if (config.logLevel === "debug") {
                console.log(`Changes in ${ this.config.paths.source }`);
            }
            builder.build();
            browserSync.reload();
        });
    }


    getSourceFiles() {
        const path = this.config.paths.source.split('/');
        path.push('**', '*');
        return path.join('/');
    }
}
