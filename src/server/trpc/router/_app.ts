import { router } from "../utils";
import todosRouter from "./todos";

export const appRouter = router({
  todos: todosRouter,
});

export type IAppRouter = typeof appRouter;
