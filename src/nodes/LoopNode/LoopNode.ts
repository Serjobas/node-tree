import { BaseNode } from "../BaseNode/BaseNode";

const TYPE = "LoopNode";

type Params = {
  iterations: number;
  subtree: BaseNode;
  child?: BaseNode;
};

export class LoopNode extends BaseNode {
  public type = TYPE;

  private iterations;
  private subtree;

  constructor({ iterations, subtree, child }: Params) {
    super(child);
    this.iterations = iterations;
    this.subtree = subtree;
  }

  execute(): void {
    for (let i = 0; i < this.iterations; i++) {
      this.subtree.execute();
    }
    this.executeChild();
  }
}

export type LoopNodeType = {
  type: typeof TYPE;
} & Params;
