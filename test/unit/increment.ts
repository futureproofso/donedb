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

describe("increment", function () {
  it("increases the previous value by 1", async function () {
    // @ts-ignore
    this.timeout(5000);
    const field = "TESTINCREMENT";
    const initialValue = 0;
    await donedb.create(field, initialValue);
    await donedb.increment(field);
    let res = await donedb.get(field);
    expect(res.app).to.equal(APP_ID);
    expect(res.field).to.equal(field);
    expect(res.value).to.equal(initialValue + 1);
    await donedb.increment(field);
    res = await donedb.get(field);
    expect(res.app).to.equal(APP_ID);
    expect(res.field).to.equal(field);
    expect(res.value).to.equal(initialValue + 2);
  });
});
