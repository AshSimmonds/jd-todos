import { type Todo } from "@prisma/client";
import { Show, type Component, Switch, Match } from "solid-js";
import Spinner from "../Spinner";

interface IToDoItemProps extends Omit<Todo, "userId"> {
  loading?: boolean;
  itemIsLoading?: boolean;
  onClick: () => void;
}

const fixElemSize = (title: string) => {
  const MAX = 15;
  if (title.length >= MAX) {
    return title.slice(0, MAX) + ".";
  }
  return title;
};

const ToDoItem: Component<IToDoItemProps> = (props) => {
  return (
    <div class="bg-gray-300 relative rounded-lg p-2.5 w-40 h-20 flex flex-col items-center gap-2">
      <h1 class="text-sm font-bold text-gray-500">
        {fixElemSize(props.title)}
      </h1>
      <Show when={props.itemIsLoading}>
        <div class="absolute top-2 right-1">
          <Spinner sm />
        </div>
      </Show>
      <button
        disabled={props.loading}
        onClick={() => props.onClick()}
        classList={{
          "bg-red": !props.completed,
          "bg-green": props.completed,
          "cursor-pointer": !props.loading,
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
