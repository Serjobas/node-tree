import { ConditionNode } from "./ConditionNode";
import { BaseNode } from "../BaseNode/BaseNode";

class MockNode extends BaseNode {
  public executeCount = 0;

  execute(): void {
    this.executeCount++;
  }
}

test("ConditionNode executes trueAction when expression is true", () => {
  const trueAction = new MockNode();
  const falseAction = new MockNode();
  const conditionNode = new ConditionNode({
    expression: "1 + 1 === 2",
    trueAction,
    falseAction,
  });

  conditionNode.execute();

  expect(trueAction.executeCount).toBe(1);
  expect(falseAction.executeCount).toBe(0);
});

test("ConditionNode executes falseAction when expression is false", () => {
  const trueAction = new MockNode();
  const falseAction = new MockNode();
  const conditionNode = new ConditionNode({
    expression: "1 + 1 === 3",
    trueAction,
    falseAction,
  });

  conditionNode.execute();

  expect(trueAction.executeCount).toBe(0);
  expect(falseAction.executeCount).toBe(1);
});

test("ConditionNode does not throw error when actions are undefined", () => {
  const conditionNode = new ConditionNode({
    expression: "1 + 1 === 2",
  });

  expect(() => conditionNode.execute()).not.toThrow();
});
