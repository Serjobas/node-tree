import { BaseNode } from "./BaseNode";

class MockNode extends BaseNode {
  public executeCount = 0;

  execute(): void {
    this.executeCount++;
  }
}

test("BaseNode executeChild calls execute on child node", () => {
  const childNode = new MockNode();
  const parentNode = new MockNode(childNode);

  parentNode["executeChild"]();

  expect(childNode.executeCount).toBe(1);
});

test("BaseNode executeChild does nothing when there is no child node", () => {
  const parentNode = new MockNode();

  expect(() => parentNode["executeChild"]()).not.toThrow();
});
