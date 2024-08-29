import { BaseNode, BaseNodeType } from "./BaseNode/BaseNode";
import {
  ConditionNode,
  ConditionNodeType,
} from "./ConditionNode/ConditionNode";
import { LoopNode, LoopNodeType } from "./LoopNode/LoopNode";
import {
  SendEmailNode,
  SendEmailNodeType,
} from "./SendEmailNode/SendEmailNode";
import { SendSMSNode, SendSMSNodeType } from "./SendSMSNode/SendSMSNode";

const nodeClasses = {
  ConditionNode,
  LoopNode,
  SendEmailNode,
  SendSMSNode,
};

function deserializeNode(tree: string | object): BaseNode {
  const jsonObject = typeof tree === "string" ? JSON.parse(tree) : tree;

  function createNode(nodeData: any): BaseNode {
    const NodeClass = nodeClasses[nodeData.type as keyof typeof nodeClasses];
    if (!NodeClass) {
      throw new Error(`Unknown node type: ${nodeData.type}`);
    }

    const nodeProps: any = {};
    for (const [key, value] of Object.entries(nodeData)) {
      if (key === "type") continue;
      // Iterate over all the properties of the node to check if they are BaseNode's instances
      if (value && typeof value === "object" && "type" in value) {
        nodeProps[key] = createNode(value);
      } else {
        nodeProps[key] = value;
      }
    }

    return new NodeClass(nodeProps);
  }

  return createNode(jsonObject);
}

function serializeNode(node: BaseNode): string {
  return JSON.stringify(node);
}
export {
  BaseNode,
  ConditionNode,
  LoopNode,
  SendEmailNode,
  SendSMSNode,
  deserializeNode,
  serializeNode,
  // Types may be usefull to share with Frontend or other Services.
  BaseNodeType,
  ConditionNodeType,
  LoopNodeType,
  SendEmailNodeType,
  SendSMSNodeType,
};
