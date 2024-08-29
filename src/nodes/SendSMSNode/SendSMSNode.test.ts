import { SendSMSNode } from "./SendSMSNode";

test("SendSMSNode logs correct message", () => {
  const node = new SendSMSNode({ phoneNumber: "123" });
  console.log = jest.fn();
  node.execute();

  expect(console.log).toHaveBeenCalledWith("Sending SMS to 123");
});
