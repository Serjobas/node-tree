import { BaseNode } from "../BaseNode/BaseNode";

const TYPE = "SendEmailNode";

type Params = {
  sender: string;
  receiver: string;
  child?: BaseNode;
};

export class SendEmailNode extends BaseNode {
  public type = TYPE;

  private sender;
  private receiver;

  constructor({ sender, receiver, child }: Params) {
    super(child);
    this.sender = sender;
    this.receiver = receiver;
  }

  execute(): void {
    console.log(`Sending email from ${this.sender} to ${this.receiver}`);
    this.executeChild();
  }
}

export type SendEmailNodeType = {
  type: typeof TYPE;
} & Params;
