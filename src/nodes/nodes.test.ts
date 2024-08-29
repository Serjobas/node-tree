import {
  serializeNode,
  deserializeNode,
  LoopNode,
  SendEmailNode,
  SendSMSNode,
} from "./index";

describe("serializeNode and deserializeNode works correctly", () => {
  it("serializeNode correctly serializes a single node", () => {
    const node = new SendEmailNode({
      sender: "alex@gmail.com",
      receiver: "jake@gmail.com",
    });

    const serialized = serializeNode(node);
    const expected = JSON.stringify({
      type: "SendEmailNode",
      sender: "alex@gmail.com",
      receiver: "jake@gmail.com",
    });

    expect(serialized).toBe(expected);
  });

  it("deserializeNode correctly deserializes a single node", () => {
    const tree = JSON.stringify({
      type: "SendEmailNode",
      sender: "alex@gmail.com",
      receiver: "jake@gmail.com",
    });

    const node = deserializeNode(tree) as SendEmailNode;

    expect(node).toBeInstanceOf(SendEmailNode);
    expect(node["sender"]).toBe("alex@gmail.com");
    expect(node["receiver"]).toBe("jake@gmail.com");

    const executeSpy = jest.spyOn(node, "execute");
    node.execute();

    expect(executeSpy).toHaveBeenCalledTimes(1);

    executeSpy.mockRestore();
  });
});

it("serializeNode correctly serializes a tree", () => {
  const tree = new LoopNode({
    iterations: 2,
    subtree: new SendEmailNode({
      sender: "alex@gmail.com",
      receiver: "jake@gmail.com",
    }),
    child: new SendSMSNode({
      phoneNumber: "123",
    }),
  });

  const serialized = serializeNode(tree);
  const expected = {
    type: "LoopNode",
    iterations: 2,
    child: {
      type: "SendSMSNode",
      phoneNumber: "123",
    },
    subtree: {
      type: "SendEmailNode",
      sender: "alex@gmail.com",
      receiver: "jake@gmail.com",
    },
  };

  //  Need to parse JSON here because order of keys in JSON is not guaranteed, so assumption will fail
  expect(JSON.parse(serialized)).toEqual(expected);
});

it("deserializeNode correctly deserializes a tree", () => {
  const tree = JSON.stringify({
    type: "LoopNode",
    iterations: 2,
    subtree: {
      type: "SendEmailNode",
      sender: "alex@gmail.com",
      receiver: "jake@gmail.com",
    },
    child: {
      type: "SendSMSNode",
      phoneNumber: "123",
    },
  });

  const node = deserializeNode(tree) as LoopNode;

  const loopNodeSpy = jest.spyOn(node, "execute");
  const subtreeNodeSpy = jest.spyOn(node["subtree"], "execute");
  const childNodeSpy = jest.spyOn(node["child"] as SendSMSNode, "execute");
  node.execute();

  expect(loopNodeSpy).toHaveBeenCalledTimes(1);
  expect(subtreeNodeSpy).toHaveBeenCalledTimes(2);
  expect(childNodeSpy).toHaveBeenCalledTimes(1);

  expect(node).toBeInstanceOf(LoopNode);
  expect(node["iterations"]).toBe(2);
  expect(node["subtree"]).toBeInstanceOf(SendEmailNode);
  expect((node["subtree"] as SendEmailNode)["sender"]).toBe("alex@gmail.com");
  expect((node["subtree"] as SendEmailNode)["receiver"]).toBe("jake@gmail.com");
  expect(node["child"]).toBeInstanceOf(SendSMSNode);
  expect((node["child"] as SendSMSNode)["phoneNumber"]).toBe("123");
});
