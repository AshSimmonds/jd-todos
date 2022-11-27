import { Match, For, Switch, createSignal } from "solid-js";
import {
  CreateTodo,
  Pagination,
  Spinner,
  ToDoItem,
  UserDashboard,
} from "~/components";
import { withProtected } from "~/layouts/Protected";
import { trpc } from "~/utils/trpc";
import { Title } from "solid-start";

export const { routeData, Page } = withProtected((user) => {
  const [currentPage, setCurrentPage] = createSignal(1);
  const todos = trpc.todos.getUserTodos.useQuery(
    // eslint-disable-next-line solid/reactivity
    () => ({
      currentPage: currentPage(),
    })
  );

  return (
    <>
      <Title>My Todos</Title>
      <div class="flex flex-col gap-2 items-center">
        <UserDashboard withBg {...user}>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </UserDashboard>
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
