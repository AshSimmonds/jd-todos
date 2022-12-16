import { Match, Switch, type Component } from "solid-js";
import { useRouteData } from "solid-start";
import { createServerData$, redirect } from "solid-start/server";
import { authenticator } from "~/server/auth";
import { type User } from "@prisma/client";
import { Spinner } from "~/components";

export default (Component: ProtectedRouter, reverse?: boolean) => {
  const routeData = () => {
    const opts = { key: () => ["auth_user"] };
    // cannot pass the reverse prop to the server data, an erro will be thrown
    if (reverse) {
      return createServerData$(async (_, { request }) => {
        const user = await authenticator.isAuthenticated(request);
        if (user) {
          throw redirect("/");
        }
        return user;
      }, opts);
    }
    return createServerData$(async (_, { request }) => {
      const user = await authenticator.isAuthenticated(request);
      if (!user) {
        throw redirect("/login");
      }
      return user;
    }, opts);
  };
  return {
    routeData,
    Page: () => {
      const current = useRouteData<typeof routeData>();
      return (
        <Switch fallback={<Component {...(current() as User)} />}>
          <Match when={current.loading || current() instanceof Response}>
            <Spinner />
          </Match>
        </Switch>
      );
    },
  };
};

export type ProtectedRouter = Component<User>;
