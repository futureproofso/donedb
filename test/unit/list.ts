import { expect } from "chai";
import { DoneDbNodeClient } from "../../src/node/client.js";
import { DoneDbNodeConfig } from "../../src/node/config.js";

let donedb: DoneDbNodeClient;
const APP_ID = "TESTAPP";

before(async function () {
  this.timeout(5000);
  const donedbConfig = new DoneDbNodeConfig({
    // url: "https://api.donedb.com",
    // url: "https://g2ag6tlxwv6n6f54zocadschcu0oyrno.lambda-url.us-west-2.on.aws"
    url: "http://localhost:9000",
    app: APP_ID
  });
  await donedbConfig.fill();
  donedb = new DoneDbNodeClient(donedbConfig);
});

describe("list", function () {
  it("returns all app field names", async function () {
    // @ts-ignore
    this.timeout(5000);
    const field = "TESTLIST";
    const initialValue = 0;
    await donedb.create(field, initialValue);
    let res = await donedb.list();
    expect(res.fields).to.include(field);
  });
});
