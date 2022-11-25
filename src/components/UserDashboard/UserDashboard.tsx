import { type User } from "@prisma/client";
import { type Component, type JSX } from "solid-js";
import { authClient } from "~/utils/auth";
import NiceButton from "../NiceButton";

interface IUserDashboardProps extends User {
  children?: JSX.Element;
  withBg?: boolean;
}
const UserDashboard: Component<IUserDashboardProps> = (props) => {
  return (
    <div
      classList={{
        "flex flex-col items-center": true,
        "gap-4": !props.withBg,
        "rounded-lg bg-gray-200 p-3 min-w-3/4 sm:min-w-sm": props.withBg,
      }}
    >
      <img src={props.avatar} class="h-16 rounded-full w-16" />
      <h1 class="font-semibold text-xl text-gray-500 leading-tight">
        Logged in as <span class="text-purple-400">{props.displayName}</span>
      </h1>
      <NiceButton
        label="Sign Out"
        dark
        onClick={() => authClient.logout({ redirectTo: "/account" })}
      />
      {props.children}
    </div>
  );
};

export default UserDashboard;
