import {DoneDbConfigOptions} from "../../src/config";
import {DoneDbNodeConfig} from "../../src/node/config";
import {DoneDbNodeClient} from "../../src/node/client";
export function createConfig(options?: DoneDbConfigOptions): DoneDbNodeConfig {
        return new DoneDbNodeConfig(options);
}
export function createClient(config: DoneDbNodeConfig): DoneDbNodeClient {
        return new DoneDbNodeClient(config);
}