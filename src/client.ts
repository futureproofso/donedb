import { DoneDbConfig } from "./config.js";

type ClientPolyfills = {
  poll: (...args: any[]) => number | NodeJS.Timer;
};

type GetResponse = {
  app: string;
  field: string;
  value: any;
};

type ListResponse = {
  app: string;
  fields: Array<string>;
};

export class DoneDbClient {
  config: DoneDbConfig;
  _polyfills: any;

  constructor(config: DoneDbConfig, polyfills: ClientPolyfills) {
    this._polyfills = polyfills;
    if (!config.filled) {
      throw Error("Config is not filled");
    }
    this.config = config;
  }

  async create(field: string, initialValue: any): Promise<Response> {
    const url = `${this.config.url}/create`;
    const body = {
      field,
      value: initialValue,
    };
    return await this._send(url, body);
  }

  async increment(field: string): Promise<Response> {
    const url = `${this.config.url}/increment`;
    const body = {
      field,
    };
    return await this._send(url, body);
  }

  async get(field: string): Promise<GetResponse> {
    const url = `${this.config.url}/get`;
    const body = {
      field,
    };
    const response = await this._send(url, body);
    return response.json();
  }

  async list(): Promise<ListResponse> {
    const url = `${this.config.url}/get`;
    const body = {};
    const response = await this._send(url, body);
    return response.json();
  }

  watch(field: string, cb: Function): NodeJS.Timer | number {
    const url = `${this.config.url}/get`;
    const body = {
      field,
    };
    let intervalMilliseconds = Math.max(this.config.watchDelay, 1) * 1000;

    let controller = new AbortController();
    let signal = controller.signal;

    const run = async () => {
      controller.abort();
      controller = new AbortController();
      signal = controller.signal;
      try {
        const resp = await this._send(url, body, signal);
        cb(await resp.json());
      } catch (err) {
        console.error(err);
      }
    };
    run();
    return this._polyfills.poll(run, intervalMilliseconds);
  }

  stopWatch(timer: NodeJS.Timer | number) {
    clearInterval(timer);
  }

  async _send(
    url: string,
    body: any,
    signal?: AbortSignal,
  ): Promise<Response> {
    const method = "POST";
    const headers = {
      Authorization: `Basic ${this.config.authKey}`,
      "Content-Type": "application/json",
    };
    const response = await fetch(url, {
      signal,
      method,
      headers,
      body: JSON.stringify({
        app: this.config.app,
        metadata: this.config.metadata,
        ...body,
      }),
    });
    if (!response.ok) {
      try {
        console.error(await response.json());
      } catch (err) {
        // pass
      }
      throw Error(`Bad HTTP response: ${response.status}`);
    }
    return response;
  }
}
