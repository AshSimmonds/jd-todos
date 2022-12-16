import { Match, For, Switch, createSignal } from "solid-js";
import {
  CreateTodo,
  Pagination,
  Spinner,
  ToDoItem,
  Protected,
} from "~/components";
import { trpc } from "~/utils/trpc";
import { Title } from "solid-start";

export const { routeData, Page } = Protected(() => {
  const [currentPage, setCurrentPage] = createSignal(1);
  const todos = trpc.todos.getUserTodos.useQuery(
    // eslint-disable-next-line solid/reactivity
    () => ({
      currentPage: currentPage(),
    })
  );

  return (
    <>
      <Title>Create JD App - My Todos</Title>
      <div class="flex flex-col gap-2 items-center justify-center w-full">
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <CreateTodo currentPage={currentPage} />
        <Switch>
          <Match when={todos.isLoading}>
            <Spinner />
          </Match>
          <Match when={todos.data} keyed>
            {(todos) => (
              <div class="flex gap-2 items-center justify-center flex-wrap max-w-[40rem]">
                <For each={todos}>
                  {(todo) => <ToDoItem currentPage={currentPage} {...todo} />}
                </For>
              </div>
            )}
          </Match>
        </Switch>
      </div>
    </>
  );
});

export default Page;
