import { assert, expect, suite, test } from "vitest";

test("Math.sqrt()", async () => {
  assert.equal(Math.sqrt(4), 2);
  assert.equal(Math.sqrt(2), Math.SQRT2);
  expect(Math.sqrt(144)).toStrictEqual(12);
  // await new Promise(resolve => setTimeout(resolve, 3000))
});

const hi = suite("suite");

hi.test("expect truthy", () => {
  expect({}).toBeTruthy();
  expect(null).not.toBeTruthy();
});
