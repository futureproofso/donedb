import { DoneDbClient } from "../client.js";
import { DoneDbNodeConfig } from "./config.js";

export class DoneDbNodeClient extends DoneDbClient {
  constructor(config: DoneDbNodeConfig) {
    const polyfills = {
      poll: (handler: any, timeout: any) => setInterval(handler, timeout)
    };
    super(config, polyfills);
  }
}
