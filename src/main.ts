type ClientBody = {
  field: string;
};

type ValueResponse = {
  field: string;
  value: any;
};

export class DoneDbClient {
  url: string = "https://rpc.donedb.com";
  authKey: string;
  metadata: string | undefined;

  constructor(authKey: string, metadata?: string) {
    this.authKey = authKey;
    this.metadata = metadata;
  }

  async create(field: string, initialValue: any): Promise<Response> {
    const url = `${this.url}/create`;
    const body = {
      field,
      initialValue,
    };
    return await this._send(url, body);
  }

  async increment(field: string): Promise<Response> {
    const url = `${this.url}/increment`;
    const body = {
      field,
    };
    return await this._send(url, body);
  }

  async get(field: string): Promise<ValueResponse> {
    const url = `${this.url}/get`;
    const body = {
      field,
    };
    const response = await this._send(url, body);
    return response.json();
  }

  watch(field: string, cb: Function): NodeJS.Timer | number {
    const url = `${this.url}/get`;
    const body = {
      field,
    };
    const intervalMilliseconds = 60000;

    let controller = new AbortController();
    let signal = controller.signal;

    const run = async () => {
      controller.abort();
      controller = new AbortController();
      signal = controller.signal;
      this._send(url, body, signal)
        .then((response) => {
          cb(response.json());
        })
        .catch((err) => {
          console.error(err);
        });
    };

    if (window) {
      return window.setInterval(run, intervalMilliseconds);
    } else {
      return setInterval(run, intervalMilliseconds);
    }
  }

  stopWatch(timer: NodeJS.Timer | number) {
    clearInterval(timer);
  }

  async _send(
    url: string,
    body: ClientBody,
    signal?: AbortSignal,
  ): Promise<Response> {
    const method = "POST";
    const headers = {
      Authorization: `Basic ${this.authKey}`,
      "Content-Type": "application/json",
    };
    const response = await fetch(url, {
      signal,
      method,
      headers,
      body: JSON.stringify({
        metadata: this.metadata,
        ...body,
      }),
    });
    if (!response.ok) {
      throw Error(`Bad HTTP response: ${response.status}`);
    }
    return response;
  }
}
