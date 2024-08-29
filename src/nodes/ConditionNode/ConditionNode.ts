import { BaseNode } from "../BaseNode/BaseNode";

const TYPE = "ConditionNode";

type Params = {
  expression: string;
  trueAction?: BaseNode;
  falseAction?: BaseNode;
};

export class ConditionNode extends BaseNode {
  public type = TYPE;

  private expression;
  private trueAction;
  private falseAction;

  constructor({ expression, trueAction, falseAction }: Params) {
    super();

    this.expression = expression;
    this.trueAction = trueAction;
    this.falseAction = falseAction;
  }

  // ConditionAction doesn't have a nextNode, trueAction and falseAction can have nextNode
  execute(): void {
    const result = eval(this.expression);
    if (result) {
      this.trueAction?.execute();
    } else {
      this.falseAction?.execute();
    }
  }
}

export type ConditionNodeType = {
  type: typeof TYPE;
} & Params;
