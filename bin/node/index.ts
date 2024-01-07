import {DoneDbConfigOptions} from "../../src/config.js";
import {DoneDbNodeConfig} from "../../src/node/config.js";
import {DoneDbNodeClient} from "../../src/node/client.js";
export function createConfig(options?: DoneDbConfigOptions): DoneDbNodeConfig {
        return new DoneDbNodeConfig(options);
}
export function createClient(config: DoneDbNodeConfig): DoneDbNodeClient {
        return new DoneDbNodeClient(config);
}
