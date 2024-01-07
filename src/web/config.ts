import { DoneDbConfigOptions, DoneDbConfig } from "../config.js";
import { base64EncodeWeb } from "../poly/b64.js";
import { createUser } from "./auth.js";

export class DoneDbWebConfig extends DoneDbConfig {
  constructor(options?: DoneDbConfigOptions) {
    const polyfills = {
      navigator: window.navigator,
      uuid: () => window.crypto.randomUUID(),
      base64Encode: base64EncodeWeb,
      getRandomValues: (arr: any) => window.crypto.getRandomValues(arr),
      createUser: createUser
    };
    super(polyfills, options);
  }
}
