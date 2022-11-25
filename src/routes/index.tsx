import { Match, For, Switch, createSignal, Show } from "solid-js";
import {
  Pagination,
  Spinner,
  ToDoItem,
  ToDoModal,
  UserDashboard,
} from "~/components";
import { withProtected } from "~/layouts/Protected";
import { trpc } from "~/utils/trpc";
import { Title } from "solid-start";
import { type Todo } from "@prisma/client";

export const { routeData, Page } = withProtected((user) => {
  const [loadingTodo, setLoadingTodo] = createSignal<string | null>(null);
  const [todoModal, setTodoModal] = createSignal<null | Omit<Todo, "userId">>(
    null
  );
  const [currentPage, setCurrentPage] = createSignal(1);
  const ctx = trpc.useContext();
  const todos = trpc.todos.getUserTodos.useQuery(
    // eslint-disable-next-line solid/reactivity
    () => ({
      currentPage: currentPage(),
    }),
    {
      get refetchOnWindowFocus() {
        return todoModal() === null;
      },
    }
  );
  const changeToDoStatus = trpc.todos.changeToDoStatus.useMutation({
    onSuccess: () => {
      ctx.todos.getUserTodos.invalidate();
    },
    onSettled: () => {
      setLoadingTodo(null);
    },
  });
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
        <Switch>
          <Match when={todos.isLoading}>
            <Spinner />
          </Match>
          <Match when={todos.data} keyed>
            {(todos) => (
              <div class="flex gap-2 items-center justify-center flex-wrap max-w-[40rem]">
                <For each={todos}>
                  {(todo) => (
                    <ToDoItem
                      {...todo}
                      setTodoModal={setTodoModal}
                      itemIsLoading={loadingTodo() === todo.id}
                      loading={changeToDoStatus.isLoading}
                      onClick={() => {
                        if (changeToDoStatus.isLoading) return;
                        setLoadingTodo(todo.id);
                        changeToDoStatus.mutateAsync({
                          id: todo.id,
                          status: !todo.completed,
                        });
                      }}
                    />
                  )}
                </For>
              </div>
            )}
          </Match>
        </Switch>
        <Show when={todoModal()} keyed>
          {(todo) => <ToDoModal setTodoModal={setTodoModal} {...todo} />}
        </Show>
      </div>
    </>
  );
});

export default Page;
