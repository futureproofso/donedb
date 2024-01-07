import * as nodeCrypto from "crypto";
import { base64Encode } from "../poly/b64.js";
import { DoneDbConfig, DoneDbConfigOptions } from "../config.js";
import { createUser } from "./auth.js";

export class DoneDbNodeConfig extends DoneDbConfig {
  constructor(options?: DoneDbConfigOptions) {
    const polyfills = {
      navigator: undefined,
      uuid: () => nodeCrypto.randomUUID(),
      base64Encode: base64Encode,
      getRandomValues: (arr: any) => nodeCrypto.webcrypto.getRandomValues(arr),
      createUser: createUser
    };
    super(polyfills, options);
  }
}
