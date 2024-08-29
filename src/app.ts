import express, { Express } from "express";
import bodyParser from "body-parser";
import { executeTree } from "./routes/execute-tree";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/execute", executeTree);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
