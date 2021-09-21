import { Config } from "./config";
import { Builder } from "./builder.js";
import { Server } from "./server.js";

export class Samurai {
    constructor(config: Config) {
        if (process.argv.includes('--build')) {
            new Builder(config).build()
        } else if (process.argv.includes('--serve')) {
            new Server(config);
        } else {
            throw 'Unknown action'
        }
    }
}