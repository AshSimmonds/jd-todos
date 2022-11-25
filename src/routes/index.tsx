import { Match, For, Switch, createSignal, Show } from "solid-js";
import {
  CreateTodoModal,
  Pagination,
  Spinner,
  ToDoItem,
  UserDashboard,
} from "~/components";
import { withProtected } from "~/layouts/Protected";
import { trpc } from "~/utils/trpc";
import { Title } from "solid-start";

export const { routeData, Page } = withProtected((user) => {
  const [loadingTodo, setLoadingTodo] = createSignal<string | null>(null);
  const [creatingTodo, setCreatingTodo] = createSignal(false);
  const [currentPage, setCurrentPage] = createSignal(1);
  const ctx = trpc.useContext();
  const todos = trpc.todos.getUserTodos.useQuery(
    // eslint-disable-next-line solid/reactivity
    () => ({
      currentPage: currentPage(),
    }),
    {
      get refetchOnWindowFocus() {
        return !creatingTodo();
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
        <UserDashboard relative withBg {...user}>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <button
            onClick={() => setCreatingTodo(true)}
            class="absolute transition-opacity hover:(opacity-50) border-none top-3 right-2 rounded-full p-2.5 bg-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-purple-600 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
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
        <Show when={creatingTodo()}>
          <CreateTodoModal
            onSuccessfulCreate={() => ctx.todos.getUserTodos.invalidate()}
            setCreatingTodo={setCreatingTodo}
          />
        </Show>
      </div>
    </>
  );
});

export default Page;
