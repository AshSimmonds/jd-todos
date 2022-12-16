import { type VoidComponent } from "solid-js";
import { createServerData$ } from "solid-start/server";
import { authenticator } from "~/server/auth";
import User from "./User";

const NavBar: VoidComponent = () => {
  const user = useUser();
  return (
    <nav
      style={{
        "--un-bg-opacity": 0.5,
      }}
      class="w-full flex gap-2 items-center bg-gray-2 h-3.5rem fixed top-0"
    >
      <div class="mx-12 w-full">
        <User user={user} />
      </div>
    </nav>
  );
};

export default NavBar;

const useUser = () => {
  return createServerData$(
    async (_, event) => {
      return await authenticator.isAuthenticated(event.request);
    },
    { key: () => ["auth_user"] }
  );
};
