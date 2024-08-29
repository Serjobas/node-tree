import { BaseNode } from "../BaseNode/BaseNode";

const TYPE = "SendSMSNode";

type Params = {
  phoneNumber: string;
  child?: BaseNode;
};

export class SendSMSNode extends BaseNode {
  public type = TYPE;

  private phoneNumber;

  constructor({ phoneNumber, child }: Params) {
    super(child);
    this.phoneNumber = phoneNumber;
  }

  execute(): void {
    console.log(`Sending SMS to ${this.phoneNumber}`);
    this.executeChild();
  }
}

export type SendSMSNodeType = {
  type: typeof TYPE;
} & Params;
