import { Request, Response } from "express";
import { deserializeNode } from "../nodes";

export async function executeTree(req: Request, res: Response) {
  try {
    const tree = deserializeNode(req.body);
    tree.execute();
    res.send({ ok: true });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.startsWith("Unknown node type")
    ) {
      res.status(400).send("Unknown node type in the tree");
    } else {
      res.status(500).send("Internal server error");
    }
  }
}
