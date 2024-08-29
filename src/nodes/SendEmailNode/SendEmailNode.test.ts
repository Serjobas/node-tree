import { SendEmailNode } from "./SendEmailNode";

test("SendEmailNode logs correct message", () => {
  const node = new SendEmailNode({
    sender: "vova@gmail.com",
    receiver: "228@gmail.com",
  });
  console.log = jest.fn();
  node.execute();

  expect(console.log).toHaveBeenCalledWith(
    "Sending email from vova@gmail.com to 228@gmail.com"
  );
});
