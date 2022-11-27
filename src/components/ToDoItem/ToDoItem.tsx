import { type Todo } from "@prisma/client";
import { Show, type Component, Switch, Match, type Accessor } from "solid-js";
import { trpc } from "~/utils/trpc";
import Spinner from "../Spinner";

interface IToDoItemProps extends Omit<Todo, "userId"> {
  currentPage: Accessor<number>;
}

export const MAX_TODO_TITLE = 15;

const fixElemSize = (title: string) => {
  if (title.length >= MAX_TODO_TITLE) {
    return title.slice(0, MAX_TODO_TITLE) + ".";
  }
  return title;
};

const ToDoItem: Component<IToDoItemProps> = (props) => {
  const ctx = trpc.useContext();
  const changeToDoStatus = trpc.todos.changeToDoStatus.useMutation({
    onSuccess: async () => {
      await ctx.todos.getUserTodos.invalidate({
        currentPage: props.currentPage(),
      });
    },
  });
  return (
    <div class="bg-gray-300 relative rounded-lg p-2.5 w-40 h-20 flex flex-col items-center gap-2">
      <h1 class="text-sm font-bold text-gray-500">
        {fixElemSize(props.title)}
      </h1>
      <Show when={changeToDoStatus.isLoading}>
        <div class="absolute top-2 right-1 animate-fade-in animate-duration-500ms">
          <Spinner sm />
        </div>
      </Show>
      <button
        onClick={() =>
          changeToDoStatus.mutateAsync({
            id: props.id,
            status: !props.completed,
          })
        }
        classList={{
          "bg-red": !props.completed,
          "bg-green": props.completed,
          "cursor-pointer": !changeToDoStatus.isLoading,
          "hover:(opacity-50) transition-all border-none  p-2 flex items-center justify-center rounded-full":
            true,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <Switch
            fallback={
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            }
          >
            <Match when={props.completed}>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </Match>
          </Switch>
        </svg>
      </button>
    </div>
  );
};

export default ToDoItem;
