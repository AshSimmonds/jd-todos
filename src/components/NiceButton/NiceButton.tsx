import { type Component, type JSX } from "solid-js";

interface INiceButtonProps {
  label: string;
  onClick: () => void;
  children?: JSX.Element;
  dark?: boolean;
}

const NiceButton: Component<INiceButtonProps> = (props) => {
  return (
    <button
      onClick={() => props.onClick()}
      class={`${
        props.dark ? "bg-gray-300" : "bg-gray-200"
      } cursor-pointer transition-all hover:(opacity-50) rounded-lg p-2.5 font-bold text-lg text-purple-700 border-none flex gap-2 items-center justify-center`}
    >
      {props.label}
      {props.children}
    </button>
  );
};

export default NiceButton;
