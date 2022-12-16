import { type User as IUser } from "@prisma/client";
import {
  type Component,
  Switch,
  Match,
  type Resource,
  createSignal,
  Show,
} from "solid-js";
import { authClient } from "~/utils/auth";

const User: Component<{
  user: Resource<Omit<IUser, "password"> | null | undefined>;
}> = (props) => {
  return (
    <div class="flex gap-2 items-center">
      <Switch
        fallback={
          <div class="flex w-full items-center justify-between">
            <span class="font-bold text-md text-gray-400">Not Logged In</span>
            <button
              onClick={() =>
                authClient.login("discord", {
                  successRedirect: "/",
                  failureRedirect: "/",
                })
              }
              class={
                "bg-gray-3 border-none rounded-lg px-8 py-1.5 flex items-center justify-center text-sm font-bold text-purple-5 cursor-pointer hover:opacity-75 transition-opacity"
              }
            >
              Sign In
            </button>
          </div>
        }
      >
        <Match when={props.user.loading}>
          <ImgSkeleton />
          <span class="font-bold text-md text-gray-400">Loading</span>
        </Match>
        <Match when={props.user()} keyed>
          {(us) => (
            <div class="flex w-full items-center justify-between">
              <div class="flex gap-2 items-center">
                <UserImg src={us.avatar} />
                <span class="font-bold text-md text-gray-400">
                  {us.displayName}
                </span>
              </div>
              <button
                onClick={() => authClient.logout({ redirectTo: "/login" })}
                class={
                  "bg-gray-3 border-none rounded-lg px-8 py-1.5 flex items-center justify-center text-sm font-bold text-purple-5 cursor-pointer hover:opacity-75 transition-opacity"
                }
              >
                Sign Out
              </button>
            </div>
          )}
        </Match>
      </Switch>
    </div>
  );
};

const ImgSkeleton = () => (
  <div class={`h-9 w-9 rounded-full animate-pulse  bg-gray-3 cursor-default`} />
);

export default User;

const UserImg: Component<{ src: string }> = (props) => {
  const [loaded, setLoaded] = createSignal(false);
  return (
    <>
      <img
        onLoad={() => setLoaded(true)}
        src={props.src}
        classList={{
          "h-9 w-9 rounded-full": true,
          "absolute  opacity-0 z-[-2]": !loaded(),
        }}
      />
      <Show when={!loaded()}>
        <ImgSkeleton />
      </Show>
    </>
  );
};
