import { type Todo } from "@prisma/client";
import {
  createSignal,
  type Setter,
  type Component,
  createEffect,
  onCleanup,
} from "solid-js";

interface IToDoModalProps extends Omit<Todo, "userId"> {
  setTodoModal: Setter<Omit<Todo, "userId"> | null>;
}
const ToDoModal: Component<IToDoModalProps> = (props) => {
  const [closing, setClosing] = createSignal(false);
  createEffect(() => {
    if (closing()) {
      const timer = setTimeout(() => {
        setClosing(false);
        props.setTodoModal(null);
      }, 350);
      onCleanup(() => clearTimeout(timer));
    }
  });
  return (
    <>
      <button
        class="fixed top-0 left-0 z-[9998] h-full w-full cursor-default bg-black bg-opacity-50"
        onClick={() => setClosing(true)}
      />
      <div
        class={`bg-white flex flex-col items-center  gap-2 fixed left-2/4 right-2/4 top-2/4 z-[9999]  -translate-y-2/4 -translate-x-2/4 p-2.5 rounded-lg min-w-56 min-h-56 ${
          closing() ? "anm-slide-out" : "anm-slide-in"
        }`}
      >
        <button
          onClick={() => setClosing(true)}
          class="fixed right-3 top-3 bg-inherit border-none cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h1 class="font-bold text-lg text-gray-400">{props.title}</h1>
      </div>
    </>
  );
};

export default ToDoModal;
