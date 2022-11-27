import { createSignal, type Component, type Accessor, Show } from "solid-js";
import toast from "solid-toast";
import { createToDoScheme, TOAST_CONFIG, validateScheme } from "~/utils/scheme";
import { trpc } from "~/utils/trpc";
import Spinner from "../Spinner";

interface ICreateTodoProps {
  currentPage: Accessor<number>;
}

const CreateTodoModal: Component<ICreateTodoProps> = (props) => {
  const [title, setTitle] = createSignal("");
  const ctx = trpc.useContext();
  const createToDo = trpc.todos.createToDo.useMutation({
    onError: (e) => {
      toast.error(e.message, TOAST_CONFIG);
    },
    onSuccess: async () => {
      await ctx.todos.getUserTodos.invalidate({
        currentPage: props.currentPage(),
      });
      setTitle("");
    },
  });
  const handleOnCreate = async () => {
    if (validateScheme(createToDoScheme, { title: title() })) {
      await createToDo.mutateAsync({ title: title() });
      toast.success("Todo created!", TOAST_CONFIG);
    }
  };

  return (
    <div class="flex flex-col gap-1 relative">
      <label class="font-bold text-lg text-gray-400">Title</label>
      <Show when={createToDo.isLoading}>
        <div class="absolute top-0 -left-12">
          <Spinner sm />
        </div>
      </Show>
      <div class="flex gap-2">
        <input
          value={title()}
          onChange={(e) => setTitle(e.currentTarget.value)}
          placeholder="Title"
          type="text"
          class="border-2 font-semibold text-gray-400 placeholder:text-gray-300 border-gray-300 rounded-lg p-2.5 w-20vw focus:outline-none"
        />
        <button
          disabled={createToDo.isLoading}
          onClick={handleOnCreate}
          classList={{
            "border-none rounded-full p-2.5": true,
            "cursor-pointer transition-opacity hover:(opacity-50) bg-gray-300":
              !createToDo.isLoading,
            "bg-gray-400": createToDo.isLoading,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-purple-600"
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
      </div>
    </div>
  );
};

export default CreateTodoModal;
