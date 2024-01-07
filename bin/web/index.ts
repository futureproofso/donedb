import {DoneDbConfigOptions} from "../../src/config.js";
import {DoneDbWebConfig} from "../../src/web/config.js";
import {DoneDbWebClient} from "../../src/web/client.js";
export function createConfig(options?: DoneDbConfigOptions): DoneDbWebConfig {
    return new DoneDbWebConfig(options);
}
export function createClient(config: DoneDbWebConfig): DoneDbWebClient {
        return new DoneDbWebClient(config);
}
