import { LoopNode } from "./LoopNode";
import { BaseNode } from "../BaseNode/BaseNode";

class MockNode extends BaseNode {
  public executeCount = 0;

  execute(): void {
    this.executeCount++;
  }
}

test("LoopNode executes subtree correct number of times", () => {
  const mockNode = new MockNode();
  const loopNode = new LoopNode({ iterations: 3, subtree: mockNode });

  loopNode.execute();

  expect(mockNode.executeCount).toBe(3);
});

test("LoopNode executes child node after iterations", () => {
  const mockNode = new MockNode();
  const childNode = new MockNode();
  const loopNode = new LoopNode({
    iterations: 2,
    subtree: mockNode,
    child: childNode,
  });

  loopNode.execute();

  expect(mockNode.executeCount).toBe(2);
  expect(childNode.executeCount).toBe(1);
});
