const TYPE = "BaseNode";

export type BaseNodeType = {
  type: typeof TYPE;
  child?: BaseNode;
};

export abstract class BaseNode {
  public type: string = TYPE;

  protected child?: BaseNode;

  constructor(childNode?: BaseNode) {
    this.child = childNode;
  }

  abstract execute(): void;

  protected executeChild(): void {
    if (this.child) {
      this.child.execute();
    }
  }
}
