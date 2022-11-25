import { type Setter, type Accessor, type Component } from "solid-js";

interface IPaginationProps {
  currentPage: Accessor<number>;
  setCurrentPage: Setter<number>;
}

const Pagination: Component<IPaginationProps> = (props) => {
  return (
    <div class="flex gap-3 items-center">
      <button
        onClick={() => props.setCurrentPage((prev) => prev - 1)}
        disabled={props.currentPage() === 1}
        classList={{
          "transition-all p-2 rounded-full border-none": true,
          "bg-gray-400": props.currentPage() === 1,
          "bg-gray-300 cursor-pointer": props.currentPage() !== 1,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <h1 class="text-lg font-bold text-gray-500">{props.currentPage()}</h1>
      <button
        onClick={() => props.setCurrentPage((prev) => prev + 1)}
        classList={{
          "transition-all p-2 rounded-full border-none": true,
          "bg-gray-300 cursor-pointer hover:(bg-gray-400)": true,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
