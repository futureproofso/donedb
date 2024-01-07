import { createPass, createAuthKey } from "./auth.js";

type ConfigPolyfills = {
  navigator: Navigator | undefined;
  uuid: () => string;
  base64Encode: (text: string) => string;
  getRandomValues: (arr: any) => any;
  createUser: () => any;
};

export type DoneDbConfigOptions = {
  app?: string;
  url?: string;
  authKey?: string;
  metadata?: string;
};

export class DoneDbConfig {
  _polyfills: ConfigPolyfills;
  app: string | undefined;
  url: string;
  authKey: string | undefined;
  metadata: string | undefined;
  filled: boolean;

  constructor(polyfills: ConfigPolyfills, options?: DoneDbConfigOptions) {
    this._polyfills = polyfills;
    this.filled = false;
    this.app = options?.app;
    this.url = options?.url || "https://api.donedb.com";
    this.authKey = options?.authKey;
    this.metadata = options?.metadata;
  }

  async fill(): Promise<string> {
    if (!this.app) {
      const app = this._createAppId();
      console.log("Created new app:", app);
      this.app = app;
    }
    if (!this.authKey) {
      this.authKey = await this._createAuthKey();
    }
    this.filled = true;
    return this.authKey;
  }

  _createAppId(): string {
    return this._polyfills.uuid();
  }

  async _createAuthKey(): Promise<string> {
    const user = await this._polyfills.createUser();
    const pass = createPass(this._polyfills);
    const authKey = createAuthKey(this._polyfills, user, pass);
    return authKey;
  }
}
