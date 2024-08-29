const TYPE = "BaseNode";

export type BaseNodeType = {
  type: typeof TYPE;
  child?: BaseNode;
};

export abstract class BaseNode {
  public type = TYPE;

  protected child?;

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
