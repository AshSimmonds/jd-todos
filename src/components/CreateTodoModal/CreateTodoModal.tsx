import {
  createSignal,
  Show,
  type Component,
  createEffect,
  onCleanup,
  type Setter,
} from "solid-js";
import toast from "solid-toast";
import { createToDoScheme, TOAST_CONFIG, validateScheme } from "~/utils/scheme";
import { trpc } from "~/utils/trpc";
import Spinner from "../Spinner";

interface ICreateTodoModalProps {
  creating?: boolean;
  setCreatingTodo: Setter<boolean>;
  onSuccessfulCreate?: () => Promise<void>;
}

const CreateTodoModal: Component<ICreateTodoModalProps> = (props) => {
  const [title, setTitle] = createSignal("");
  const [closing, setClosing] = createSignal(false);
  createEffect(() => {
    if (closing()) {
      const timer = setTimeout(() => {
        setClosing(false);
        props.setCreatingTodo(false);
      }, 350);
      onCleanup(() => clearTimeout(timer));
    }
  });
  const createToDo = trpc.todos.createToDo.useMutation({
    onError: (e) => {
      setClosing(true);
      toast.error(e.message, TOAST_CONFIG);
    },
    onSuccess: async () => {
      props.setCreatingTodo(false);
      await props.onSuccessfulCreate?.();
    },
  });
  const handleOnCreate = async () => {
    if (validateScheme(createToDoScheme, { title: title() })) {
      await createToDo.mutateAsync({ title: title() });
      toast.success("Todo created!", TOAST_CONFIG);
    }
  };
  return (
    <>
      <button
        class="fixed top-0 left-0 z-[9998] h-full w-full cursor-default bg-black bg-opacity-50"
        onClick={() => setClosing(true)}
      />
      <div
        class={`bg-gray-200 flex flex-col items-center  gap-2 fixed left-2/4 right-2/4 top-2/4 z-[9999]  -translate-y-2/4 -translate-x-2/4 p-2.5 rounded-lg w-2/4 h-2/4 ${
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
        <h1 class="text-gray-400 font-bold text-xl">Create Todo</h1>
        <input
          type="text"
          value={title()}
          placeholder="Title"
          class="border-none bg-gray-300 rounded-lg p-2.5 focus:outline-none font-semibold text-gray-500"
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <button
          onClick={handleOnCreate}
          class="bg-purple-600 min-w-5rem gap-2 rounded-lg p-1 border-none w-1/4 font-bold text-lg text-white cursor-pointer flex items-center justify-center"
        >
          Create{" "}
          <Show when={createToDo.isLoading}>
            <Spinner sm />
          </Show>
        </button>
      </div>
    </>
  );
};

export default CreateTodoModal;
