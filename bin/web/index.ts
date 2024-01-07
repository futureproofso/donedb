import {DoneDbConfigOptions} from "../../src/config";
import {DoneDbWebConfig} from "../../src/web/config";
import {DoneDbWebClient} from "../../src/web/client";
export function createConfig(options?: DoneDbConfigOptions): DoneDbWebConfig {
    return new DoneDbWebConfig(options);
}
export function createClient(config: DoneDbWebConfig): DoneDbWebClient {
        return new DoneDbWebClient(config);
}
