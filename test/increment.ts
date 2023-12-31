import { AssertionError, expect } from "chai";
import { DoneDbClient } from "../src/main.js";

const donedb = new DoneDbClient("mywritekey", "optionalmetadata");

describe("increment", function () {
  it("increases the previous value by 1", async function () {
    const field = "waitlist";
    const initialValue = 0;
    await donedb.create(field, initialValue);
    await donedb.increment(field);
    const res = await donedb.get(field);
    expect(res.field).to.equal(field);
    expect(res.value).to.equal(initialValue + 1);
  });
});
