import { DoneDbClient } from "../client.js";
import { DoneDbWebConfig } from "./config.js";

export class DoneDbWebClient extends DoneDbClient {
  constructor(config: DoneDbWebConfig) {
    const polyfills = {
      poll: (handler: any, timeout: any) => window.setInterval(handler, timeout)
    };
    super(config, polyfills);
  }
}